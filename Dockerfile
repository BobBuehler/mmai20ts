FROM siggame/joueur:ts-onbuild as build

FROM siggame/joueur:ts-base

COPY --from=build --chown=siggame:siggame /usr/src/client /client
