import os
import os.path
import shutil
import subprocess
import argparse
import re
import sys
from shutil import copyfile
from distutils.dir_util import copy_tree

def run(*args, **kwargs):
    error_code = subprocess.call(*args, **kwargs)
    if error_code != 0: # an error happened
        sys.exit(error_code)

def splitall(path):
    allparts = []
    while 1:
        parts = os.path.split(path)
        if parts[0] == path:  # sentinel for absolute paths
            allparts.insert(0, parts[0])
            break
        elif parts[1] == path: # sentinel for relative paths
            allparts.insert(0, parts[1])
            break
        else:
            path = parts[0]
            allparts.insert(0, parts[1])
    return allparts

def copy_module_files(base_path, joueur=False):
    for dirpath, dnames, filenames in os.walk(base_path):
        last_dir = os.path.split(dirpath)[1]
        for filename in filenames:
            file_path = os.path.join(dirpath, filename)
            if filename.endswith('.ts'):
                path = os.path.join(dirpath, filename)
                local_path = dirpath[1:]
                game_name = last_dir[0].upper() + last_dir[1:]
                preferred = (filename == "index.ts" or filename == "run.ts")

                if not os.path.exists(local_path):
                    os.makedirs(local_path)

                with open(file_path, 'r') as file:
                    file_contents = file.read()

                description = """This is the namespace for the inner working of the TypeScript joueur client.
 *
 * 99.9% of the time none of this matters to you. However if you are curious how it works under the hood then it is documented here for your use.
 """ if joueur else """### Rules
 *
 * The full game rules for {game_name} can be found on <a href="https://github.com/siggame/Cadre/blob/master/Games/{game_name}/rules.md">GitHub</a>.
 *
 * Additional materials, such as the <a href="https://github.com/siggame/Cadre/blob/master/Games/{game_name}/story.md">story</a> and <a href="https://github.com/siggame/Cadre/blob/master/Games/{game_name}/creer.yaml">game template</a> can be found on <a href="https://github.com/siggame/Cadre/blob/master/Games/{game_name}/">GitHub</a> as well.
 """.format(game_name=game_name)

                with open(os.path.join(local_path, filename), 'w+') as file:
                    file.write("""
/**
 * {description}
 * @module {module}
 * {preferred}
 */
{d}
{file_contents}
""".format(
    description=description,
    module=("Joueur-ts-Core\n * @hidden" if joueur else game_name),
    preferred=("@preferred" if preferred else ""),
    d=("\n\n/** description */" if preferred else ""),
    file_contents=file_contents
))

"""
parser = argparse.ArgumentParser(description='Runs the python 3 client doc generation script.')
parser.add_argument('game', action='store', help='the name of the game you want to document. Must exist in ../games/')

args = parser.parse_args()

game_name = args.game[0].upper() + args.game[1:]
lower_game_name = game_name[0].lower() + game_name[1:]
"""

if os.path.isdir("./output"):
    shutil.rmtree("./output")

#copy_tree("../joueur/", "./joueur/")
#copy_tree("../games/", "./games/")
copyfile("../tsconfig.json", "./tsconfig.json")

copy_module_files("../games")
copy_module_files("../joueur", True)

"""
with open("../README.md", "r") as f:
    readme = f.read()

readme = readme.replace("GAME_NAME", game_name).replace("game_name", lower_game_name)

with open("README.md", "w+") as f:
    f.write(readme)
"""

run(["npm install"], shell=True)
run(["npm run docs"], shell=True)
copyfile("./favicon.ico", "./output/favicon.ico")

# inject favicon into output
output_path="./output"
HEAD_TAG = "<head>"
shutil.copyfile('favicon.ico', os.path.join(output_path, 'favicon.ico'))
dot_dirs = len(splitall(output_path))
for root, dirnames, filenames in os.walk(output_path):
    root = os.path.normcase(root)
    for filename in filenames:
        if not filename.endswith('.html'):
            continue

        n = (len(splitall(root)) - dot_dirs)
        with open(os.path.join(root, filename), "r+") as file:
            contents = file.read()
            contents = contents.replace("Globals<", "Games<")
            index = contents.find(HEAD_TAG) + len(HEAD_TAG)
            contents = contents[:index] + """
<link rel="shortcut icon" href="./{}favicon.ico" type="image/x-icon" />
""".format("../" * n) + contents[index:]
            file.seek(0)
            file.write(contents)

# cleanup files we made
os.remove("tsconfig.json")
shutil.rmtree("./node_modules")
shutil.rmtree("./joueur")
shutil.rmtree("./games")

print("TypeScript docs generated.")
