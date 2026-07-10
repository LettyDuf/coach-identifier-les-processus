# ROADMAP — Coach Processus

## Intention

Outil pédagogique et ludique pour apprendre à identifier les processus d'un
groupe de travail, les classer (type et niveau) et concevoir leur mesure
(chaîne KBI → KPI → KGI, métriques de flux). Public : professionnels en
formation Lean-Agile.

## Périmètre V1

- Hall d'entrée : choix du groupe de travail. "Équipe agile" et "Programme"
  ouverts ; "Management/direction" visible mais en préparation.
- Atelier "équipe agile" complet, trois gestes jouables et rejouables
  indépendamment :
  1. Repérer (sélection de candidats dans un scénario narratif, feedback par
     candidat avec le pourquoi).
  2. Classer (type puis niveau, jamais les deux ensemble, feedback de
     confusion par case).
  3. Mesurer (trois paliers : lire une mesure, choisir la métrique, construire
     la chaîne par blocs).
- Théorie en fiches (tronc commun, typologie, glossaire, anti-patterns),
  accessible depuis chaque geste.
- Atelier "programme" : un scénario ("la gestion de la demande transverse",
  D18), les trois mêmes gestes réutilisés tels quels (D8 : pur ajout de
  contenu, aucun code de domaine ni d'UI spécifique).
- 2 à 3 scénarios variants par groupe ouvert (anti sur-apprentissage) ; un
  seul scénario pour "programme" à ce stade, la consolidation de maîtrise y
  est donc encore inatteignable, comme Colibri seul avant Harfang.
- Modèle de maîtrise qualitatif repris de Coach Risques.
- Direction artistique Manufacture de nuit (D9), accessibilité AA d'office.
- Livrable : un .html monofichier ouvrable localement.

## Exclusions V1 (explicites)

- Contenu du groupe management/direction (structure prête, contenu en
  incrément suivant).
- Construction de VSM (théorie illustrée seulement).
- Saisie libre et analyse de texte (D5).
- Persistance localStorage, comptes, export.
- Guide live d'atelier (l'outil sert à s'entraîner, pas à animer une séance).

## Incréments prévus

1. Validation du cadrage : DOMAINE.md v0.1 + SCENARIO-01 (en cours).
2. Socle technique (package.json, vite single-file, vitest 3 projets, ESLint
   boundaries) sur le modèle des coachs frères.
3. Geste 1 "Repérer" : moteur + corpus scénario 1 + écran + tests. MVP jouable
   présenté à Lætitia avant de continuer.
4. Geste 2 "Classer".
5. Geste 3 "Mesurer" (les trois paliers).
6. Hall, théorie, variantes de scénarios, polissage direction artistique.
7. Ouverture du groupe "programme" : premier scénario "la gestion de la
   demande transverse" (livré, D18). Reste : variantes du groupe programme,
   et validation des noms/QCM en attente (SCENARIO-03-proposition.md).
8. V2 candidats : groupe management/direction ; mini-simulation de flux
   ("le comptoir") si le geste mesurer en montre le besoin.
