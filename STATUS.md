# STATUS — Coach Processus

Rituel de continuité de session. À mettre à jour en clôture de chaque session.

## Clôture de session — 2026-07-09 (suite 18)

Lætitia a choisi de poursuivre par la fiche "processus vu du client" et le
panel DA (chantiers 2 et 3 de la liste de suite 17).

- Fiche "le processus vu du client" (Womack, production vs consommation) :
  PROPOSITION rédigée (`FICHE-PROCESSUS-VU-DU-CLIENT-proposition.md`),
  rattachée à F2 "la carte" plutôt qu'une 5e fondation (décision exposée,
  justifiée par D16). Contenu : ancrage, deux vignettes d'échec, synthèse,
  points à trancher listés. **Non codée, en attente de validation par
  Lætitia** (aucune des 4 questions ouvertes n'a encore de réponse).
- Panel DA sur le build réel (D9 jamais confirmé jusqu'ici) : captures
  d'écran du hall, de l'atelier, des trois gestes. Verdict : la palette
  nuit/or tient mais reste plate (pas de lueur, pas de matière) ; les
  cartes du geste Repérer et l'encart de contexte du geste Mesurer
  utilisent un fond crème/parchemin qui casse l'immersion, exactement le
  défaut déjà signalé (mémoire Arcane). Recommandation faite : corriger le
  crème en priorité, chantier lueur/matière plus large à cadrer séparément.
- Lætitia a préféré une troisième voie : ajouter une texture de fond en
  filigrane plutôt que tout transformer. Trois pistes de mockup proposées
  (rouages, plans hextech, grain de laiton) sur
  `mockup-texture-filigrane.html` ; rouages retenus, mais le premier essai
  (trait laiton) jugé trop contrasté. Recoloré ton sur ton (trait `#232b36`,
  même famille que le fond) en trois degrés de discrétion ; A2 validé et
  intégré à `body::before` dans `global.css` (D19). Le fond crème des
  cartes Repérer/Mesurer reste un point ouvert, non traité (D19 le note).
- Dette D16 levée : renvoi contextuel après deux échecs consécutifs sur le
  même exercice. Composant `RenvoiApresEchecs` (jamais bloquant, seuil 2),
  navigation `returnTo` ajoutée à `App.tsx` pour revenir précisément à
  l'exercice après consultation de la fondation en entier (pas seulement
  son rappel repliable). 7 tests ajoutés (unitaires + intégration
  SpottingBoard).
- Dette ESLint boundaries levée : `eslint.config.js` (flat config,
  typescript-eslint), règle `no-restricted-imports` sur `src/domain/**`
  interdisant React/zod/@content/@adapters/@app, en complément du canari
  d'isolation existant. Script `npm run lint`. Vérifié : zéro erreur sur le
  code réel, casse bien sur une violation volontaire testée puis retirée.
- 90 tests verts, `tsc --noEmit` propre, `npm run lint` propre. Build
  335 Ko recopié vers `coach-processus.html` et `dist/index.html`.
- Dettes restantes : baobab.ts et le `node_modules` réinstallé dans le
  dossier monté, toujours à supprimer depuis le Terminal (EPERM côté bac à
  sable) ; le fond crème des cartes Repérer/Mesurer (D19) ; fiche client en
  attente de validation.

### Prochain pas
- Regard de Lætitia sur `coach-processus.html` (texture, renvoi après
  échecs) et sur la fiche client (proposition écrite, rien codé).
- Puis, selon sa priorité : valider/corriger la fiche client, traiter le
  fond crème, ou reprendre la liste de suite 17 (3e variante de scénario,
  groupe management/direction).

## Clôture de session — 2026-07-09 (suite 17)

- Ouverture du groupe "programme" : premier scénario "la gestion de la
  demande transverse" (D18), suite au choix de Lætitia de poursuivre par ce
  chantier plutôt que la 3e variante équipe agile ou la fiche client.
- Correction en route : ma première proposition (SCENARIO-03) posait un
  décor de train de livraison façon SAFe (releases coordonnées, dépendances
  inter-équipes) et un exemple d'intégration d'équipe complète. Retour de
  Lætitia : contexte réel incertain sur SAFe, pas de livraisons communes
  entre équipes, les acteurs de ce niveau sont des rôles transverses
  individuels, pas une équipe. Réécrit sur l'ancrage déjà validé en D14 (la
  gestion de la demande, vue médium de la carte à trois zooms), sans nom
  d'équipe. Aucun cas de niveau direction : l'alignement aux objectifs de
  direction n'est pas un processus à classer (D18).
- Corrigé au passage la grille d'exemples du DOMAINE §2 et sa version codée
  (theory.ts, fondation F3) : les cellules pilotage/programme et
  opérationnel/programme portaient la même hypothèse SAFe non fondée.
- Ajout de contenu pur (D8 tenu) : un fichier de scénario, une ligne d'index,
  une porte de hall passée à open:true. Aucune brique de domaine, de moteur
  ni d'UI touchée ; Hall/Atelier/SpottingBoard/ClassificationBoard/
  MeasureBoard sont restés génériques sans modification.
- 82 tests verts (dont un nouveau test corpus dédié : 3 processus, 4 leurres,
  les trois types représentés au niveau programme). Build 332 Ko recopié
  vers coach-processus.html et dist/index.html.
- SCENARIO-03 validé en bloc par Lætitia ("ok"), y compris le classement des
  trois processus, le nom "programme", le nom fictif "Virelo", les QCM.
  Deux corrections de détail depuis, apportées par elle en regardant le
  rendu : la durée et le support de la synchronisation hebdomadaire (une
  heure ou deux devant Virelo, un tableau kanban qui rend le travail et les
  priorités visibles en temps réel, pas une demi-heure sans outil).
- Bug trouvé par Lætitia en regardant le rendu : la fondation F4 (bureau
  d'études, "qui utilise quoi, à quelle cadence") supposait un groupe
  organisé en équipe avec un PO ("L'équipe et le PO", "Le PO et la
  direction"), invisible tant qu'un seul groupe existait. Contradiction
  directe avec D16 (le bureau d'études doit être neutre, transversal à tout
  groupe). Corrigé : "qui" généralisé en "groupe de travail" / "responsable"
  (vocabulaire déjà utilisé par l'app pour WorkGroup) ; même correction sur
  le test définitionnel du KBI et ses items. Laissé tel quel : les récits
  illustratifs ("Imaginez : le tableau de bord d'une équipe...") qui posent
  un exemple, pas une règle générale, à confirmer avec Lætitia. Test de
  non-régression ajouté (tests/corpus/fondations.test.ts). 83 tests verts,
  build recopié.
- À la prochaine ouverture, chantiers ouverts par ordre de valeur estimée :
  1. Validation du contenu du groupe programme (points ci-dessus).
  2. Troisième variante de scénario équipe agile (viser la maîtrise
     "consolidée") ou une variante pour le groupe programme.
  3. Fiche "Le processus vu du client" (production vs consommation, Womack).
  4. Panel graphique sur la profondeur visuelle (D9 jamais confirmée sur
     l'outil réel).
  5. Dettes : renvoi contextuel après 2 échecs (D16), suppression de
     baobab.ts (Terminal), ESLint boundaries, node_modules réinstallé dans
     le dossier monté à supprimer depuis le Terminal (EPERM côté bac à
     sable, comme baobab.ts).

## Session 1 (suite 16) — 2026-07-09 — Outils fictifs (proche mais pas identique)

### Fait
- Règle de Lætitia : ne pas nommer les vrais outils ; assez proche pour
  comprendre, assez décalé pour que l'outil ne semble jamais résoudre les
  questions du vrai terrain à la place des gens. Harfang utilise désormais
  des fictifs aux genres reconnaissables : Fluxo (moteur de processus),
  Sésame (accès), Rouage (robots logiciels), Balise (adoption numérique),
  Lanterne (minage de processus). Vérifié : zéro occurrence des vrais noms
  dans le build. Règle consignée en mémoire pour tous les scénarios à venir.
- 81 tests verts. Build livré.

## Session 1 (suite 15) — 2026-07-09 — Harfang : portefeuille d'outils de fondation

### Fait
- Précision de Lætitia : ses équipes de fondations gèrent PLUSIEURS outils
  (Camunda 7, GDA, WalkMe, Celonis, Blue Prism...). Harfang ajusté : l'équipe
  gère ce portefeuille, les demandes de service couvrent accès/workflows/
  robots, les mises à jour couvrent tous les outils. La multiplicité sert la
  leçon "le processus n'est pas l'outil" : les processus traversent tous les
  outils. Vocabulaire "accès API" généralisé en "demandes de service".
- 81 tests verts. Build 312 Ko livré. Mémoire mise à jour (décors : équipes
  de fondations et leurs outils réels).

## Session 1 (suite 14) — 2026-07-09 — Baobab remplacé par Harfang (miroir des publics)

### Fait
- Retour de Lætitia : le thème librairies était trop loin du vécu de ses
  publics (architecte de plateforme, PM, architectes intégrateurs). Scénario
  n°2 réécrit : "L'équipe Harfang", équipe plateforme d'intégration TI d'une
  grande organisation, avec exactement ces rôles et douze équipes de
  livraison clientes. Même signature de pièges (document, objectif,
  département, indicateur), conservée car c'était le but pédagogique.
- Nouveau point pédagogique fort à valider : les demandes d'accès API
  classées "opérationnel" (le type se juge du point de vue du processus et
  de son client direct, pas de l'entreprise entière) ; le piège "support"
  enseigne cette nuance. Voir SCENARIO-02-proposition.md, point 1.
- Règle apprise pour les futurs scénarios : le scénario doit être un miroir
  des rôles réels du public visé.
- baobab.ts vidé (rm impossible depuis le bac à sable) : à supprimer par
  Lætitia depuis son Terminal.
- 81 tests verts. Build 312 Ko livré.

## Session 1 (suite 13) — 2026-07-09 — Scénario n°2 Baobab + rotation

### Fait
- Contenus de la suite 12 validés en bloc par Lætitia ("on passe à la suite").
- Scénario n°2 "L'équipe Baobab" (plateforme pour librairies) : signature
  distincte (pièges document / objectif / département / indicateur), 5
  processus dont un support de niveau programme (variation d'axes vs
  Colibri), mesure complète sur la mise en production hebdomadaire, QCM
  lecture en tendance et lecture croisée de deux cadrans. PROPOSITION à
  valider : SCENARIO-02-proposition.md (3 points à trancher listés).
- Moteur : pickScenario(group) (tirage via RandomSource injectée) ; l'App
  tire un scénario à chaque entrée dans un geste. La consolidation par
  variation devient atteignable (2 signatures).
- 81 tests verts (dont : signatures distinctes par groupe, chaîne de
  référence Baobab valide via les tests corpus génériques). Build 312 Ko
  livré.

### Prochain pas
- Validation de SCENARIO-02 par Lætitia (3 points à trancher).
- Puis : troisième variante ou charte visuelle (panel), ou fiche "le
  processus vu du client".

## Session 1 (suite 12) — 2026-07-09 — Purge des redondances

### Fait
- Retour de Lætitia : redondances. Audit et corrections :
  - Geste Mesurer, palier Construire : les trois boîtes KBI/KPI/KGI (qui
    répétaient les définitions de la fondation F4 ET le rappel repliable du
    même écran) supprimées ; ne reste que la phrase-exemple causale, avec un
    pointeur vers le rappel. Donnée morte chainStory réduite à chainExample
    (domaine, schéma, corpus allégés).
  - Geste Repérer : la consigne ne répète plus les trois tests (déjà dans le
    rappel repliable au-dessus) ; elle y pointe.
  - Redondance déguisée F2/F3 : la carte dit macro/médium/micro, la grille
    direction/programme/équipe, sans lien. Phrase-pont ajoutée à la grille :
    "les niveaux de la grille sont les zooms de la carte" (THEORY_BRIDGE, à
    valider). Titres des renvois uniformisés ("Revoir la fondation : ...").
- 79 tests verts. Build 300 Ko livré.

## Session 1 (suite 11) — 2026-07-09 — Réarchitecture : le bureau d'études (D16)

### Fait
- Diagnostic de Lætitia : le sens de la mesure touche tous les domaines,
  l'architecture accumulait des incohérences. Panel consulté (pédagogue
  4C/ID + UX), architecture validée par Lætitia, puis exécutée.
- Le hall a deux espaces : le bureau d'études (4 fondations avec lampe
  visitée : F1 processus, F2 carte à trois zooms, F3 grille, F4 mesurer :
  pourquoi/comment/pour qui) et les ateliers. Contenu des fondations
  transversal et neutre dans content/fondations.ts (F1 nouvelle activité
  votes + trois tests ; F4 = situations + familles d'indicateurs + qui-
  utilise-quoi, sortis du scénario et du domaine).
- Domaine allégé : SenseContent/FamilyRound retirés de MeasureContent et du
  moteur. Geste Mesurer : 3 paliers (Lire, Choisir, Construire). Gestes :
  lien "fondation liée" avec lampe + rappel doux ; renvois repliables
  (3 tests dans Repérer, familles dans Mesurer, grille dans Classer).
- 79 tests verts (17 fichiers). Build 300 Ko livré.

### Dette (D16)
- Renvoi contextuel après deux échecs sur un même exercice (deep-link +
  retour) : recommandé par le panel, non implémenté.
- Lampes des fondations non persistées (mémoire de session, cohérent D5).

## Session 1 (suite 10) — 2026-07-09 — Palier d'ouverture "Pourquoi trois familles ?"

### Fait
- Retour de Lætitia : trop vite encore ; il faut d'abord le sens (pourquoi
  plusieurs types d'indicateurs, comment ils se complètent, qui utilise quoi).
- Nouveau palier 1 "Pourquoi trois familles ?" construit sur l'échec : trois
  situations où le tableau de bord de Colibri n'a qu'une seule aiguille
  (KGI seul : constate sans guider ; KBI seul : tourne à vide ; KPI seul :
  optimise à l'aveugle). Chaque situation = une question à choix, feedback,
  puis la leçon (la question à laquelle la famille répond). Synthèse finale :
  la complémentarité (le levier, l'effet, le but) et le tableau qui-utilise-
  quoi (équipe/jour, équipe+PO/revue, PO+direction/trimestre).
- Le geste Mesurer fait maintenant 5 paliers : Pourquoi, Familles, Lire,
  Choisir, Construire. Domaine : SenseContent, evaluateSenseAnswer. Schéma :
  3 situations couvrant les 3 familles, une bonne réponse chacune, tableau
  des usagers complet.
- Contenu du palier (situations, leçons, complément, usagers) : proposé, à
  valider avec le reste du geste Mesurer.
- 76 tests verts. Build 288 Ko livré.

## Session 1 (suite 9) — 2026-07-09 — Palier fondateur "Les trois familles"

### Fait
- Demande de Lætitia : une activité pour comprendre ce qu'est un KBI, puis
  un KPI, puis un KGI, avant tout le reste. Le geste Mesurer passe à quatre
  paliers : 1. Familles, 2. Lire, 3. Choisir, 4. Construire.
- Palier Familles : trois manches séquencées (ordre KBI, KPI, KGI verrouillé
  par schéma et test), chacune ouvre par la définition en langage courant et
  le test à se poser (l'équipe peut-elle le décider dès demain matin ? est-ce
  que ça se lit à la sortie du processus ? est-ce la raison d'être du
  processus ?), puis 4 items à juger oui/non avec le pourquoi.
- Domaine : FamilyRound, engine.evaluateFamilyAnswer. Contenu : 12 items
  (proposés, à valider avec le reste du palier Mesurer). Schéma : ordre des
  manches, présence de oui ET de non, ids uniques.
- 74 tests verts. Build 280 Ko livré.

## Session 1 (suite 8) — 2026-07-09 — Palier 3 refondu après incompréhension

### Fait
- Retour de Lætitia sur le palier 3 : exercice incompréhensible. Diagnostic à
  trois défauts : les familles KBI/KPI/KGI jetées sans enseignement préalable,
  aucune décision à prendre (tout sélectionner gagnait), consigne en jargon.
- Correctifs (D15 amendée) : introduction visuelle de la chaîne en tête du
  palier (trois familles en langage courant + phrase-exemple causale "si
  l'équipe... alors le processus... et le client..."), contrainte de sobriété
  maxChainBlocks=4 avec nouvelle violation "too-many" ("un tableau de bord
  qui mesure tout ne pilote rien"), consigne réécrite en histoire à raconter.
- Tests gardiens ajoutés : "tout sélectionner ne gagne pas" (domaine et
  corpus). 71 tests verts. Build 276 Ko livré.
- Textes de la chainStory : contenu proposé, à valider avec les QCM.

## Session 1 (suite 7) — 2026-07-09 — Geste 3 Mesurer jouable (D15)

### Fait
- Domaine : MeasureBlock (KBI/KPI/KGI/piège, timing, isFlowMetric),
  MeasureChainEvaluator (règles DOMAINE §3, ordre pédagogique des violations,
  piège d'abord), QuizEvaluator, moteur étendu (getMeasureContent,
  evaluateQuiz, evaluateMeasureChain avec passe de maîtrise module mesurer).
- Corpus Colibri : 9 blocs de mesure (issus de SCENARIO-01 validé D11),
  8 messages de violation, chaîne de référence, 4 items de QCM (2 par
  palier : percentiles, loi de Little, choix de métrique direction/équipe).
  Les QCM sont un contenu proposé, à valider par Lætitia. Schéma Zod étendu
  (piège sans timing, une seule bonne réponse par item, flux = KPI...).
- UI : MeasureBoard en trois paliers avec jalons de progression, QCM à
  feedback immédiat, banque de blocs à sélection (nature révélée après mise
  en service), animation "le fluide circule" sur succès. Atelier : les trois
  gestes actifs. Le parcours V1 est complet de bout en bout.
- 69 tests verts (15 fichiers). Build 272 Ko recopié vers coach-processus.html.

### En attente de validation par Lætitia
- Les 4 items de QCM des paliers 1 et 2 (contenu métier rédigé par Claude).
- Les 8 messages de violation de chaîne.

### Prochain pas
- Regard et validation de Lætitia sur le geste Mesurer.
- Ensuite : variantes de scénarios (la consolidation de maîtrise exige des
  signatures distinctes), ou fiche "Le processus vu du client", ou charte
  visuelle à approfondir sur mockups.

## Session 1 (suite 6) — 2026-07-09 — La carte à trois zooms intégrée à l'outil

### Fait
- Validation en bloc par Lætitia des étapes détaillées de la carte.
- Contenu encodé en données : src/content/zoomMap.ts, schéma Zod local à
  échec bruyant (références de zoom résolues, exactement une case zoomable
  par transversal, aucun tiret long).
- Composant ZoomMap (React) : dévoilement progressif, pastille "↑ fermer",
  clic sur niveau estompé, Échap, panneau aria-live, aria-expanded sur les
  cases zoomables. Intégré à l'atelier dans un deuxième panneau repliable
  "La carte à trois zooms : qui identifie quels processus".
- Tests : corpus (triade D14 respectée, "opérationnel" jamais un niveau,
  zooms résolus) + UI (descente complète, remontées, remplacement de vue).
  53 tests verts (12 fichiers). Build 252 Ko recopié vers coach-processus.html.
- Le bac à sable avait été recyclé : environnement npm reconstruit dans /tmp.

### Complément (même session)
- Retour de Lætitia : la carte était mal placée (panneau replié en bas
  d'atelier). Déplacée au hall en section visible "Le plan de la
  manufacture", avec le texte qui relie chaque porte à son niveau de zoom.
  Retirée de l'atelier. 54 tests verts, build 256 Ko livré.

### Prochain pas
- Regard visuel de Lætitia sur le hall avec le plan.
- Geste 3 Mesurer (les trois paliers), ou variantes de scénarios Repérer.

## Session 1 (suite 5) — 2026-07-09 — La carte à trois zooms (co-conception)

### Fait
- Question de Lætitia (où cartographier la consommation client, qui identifie
  quoi) → co-conception d'une nouvelle fiche théorie. Sa proposition de vues
  emboîtées macro/médium/micro par rôle retenue ; ma fresque à deux rives
  rejetée par elle.
- Mockup itératif `mockup-carte-trois-zooms.html` (v3 + retouches) : trois
  vues emboîtées à dévoilement progressif, cases zoomables ou explicables,
  vue quittée estompée et cliquable, pastille "↑ fermer" dans la case zoomée,
  Échap en secours. Interactions vérifiées par simulations jsdom (pas de
  navigateur dans le bac à sable).
- Vocabulaire tranché avec elle (D14) : processus d'affaires / processus
  transversal / processus d'équipe ; "opérationnel" réservé à l'axe type.
- Étapes complétées par Claude d'après Womack et le BPM (Choisir, Démarrer,
  Renouveler ou quitter ; Qualifier le besoin, Vérifier la valeur en service ;
  Qualifier et reproduire, Confirmer la résolution) : consignées au DOMAINE
  §2 bis, à valider une à une par Lætitia.
- DOMAINE §2 bis et DECISIONS D14 consignés.

### Prochain pas
- Validation par Lætitia des étapes détaillées de la carte.
- Intégrer la carte dans l'outil comme fiche théorie interactive (contenu en
  données, composant + tests), accessible depuis l'atelier.
- Puis : geste 3 Mesurer, ou variantes de scénarios.

## Session 1 (suite 4) — 2026-07-09 — Théorie de la grille (retour Lætitia)

### Fait
- Retour de Lætitia : l'outil fait pratiquer mais n'enseigne pas la grille
  type x niveau. Ajout du panneau "Comprendre la grille" : message clé (les
  deux axes sont indépendants), description des 3 types et des 3 niveaux,
  tableau croisé accessible avec un exemple concret par case (9 cases).
- Contenu en données (theory.ts), affiché à la demande (details repliés)
  depuis l'atelier ET pendant l'exercice Classer. Grille d'exemples ajoutée
  au DOMAINE §2 : PROPOSITION de contenu métier à valider par Lætitia.
- 44 tests verts (10 fichiers). Build 240 Ko recopié vers coach-processus.html.

### En attente de validation par Lætitia
- Les 9 exemples de la grille et les descriptions types/niveaux (DOMAINE §2).

### Prochain pas
- Geste 3 Mesurer, ou variantes de scénarios, selon sa priorité.

## Session 1 (suite 3) — 2026-07-09 — Geste 2 Classer jouable (D13)

### Fait
- Domaine : ClassificationSpec (2 axes fermés), ClassificationEvaluator
  (affectation exacte, message de confusion du corpus, jamais formulé par le
  moteur), summarizeClassificationRun (réussite = tout juste du premier coup),
  moteur étendu (evaluateClassification, completeClassificationRun, module
  "classer").
- Corpus Colibri : classification des 5 processus avec rationales par axe et
  pièges du terrain (support-guichet, PO-décide, amélioration-support,
  onboarding-opérationnel, arbitrage-niveau-équipe), messages globaux,
  guides d'axes vulgarisés (données). Schéma étendu : processus sans corrigé
  de classement = échec de build ; piège sur la bonne case = échec de build.
- UI : ClassificationBoard (une carte à la fois, 3 cibles picto + question,
  raccourcis clavier 1/2/3, deux phases type puis niveau, synthèse finale,
  maîtrise). Atelier : geste 2 actif avec sa maîtrise. 5 icônes cibles
  ajoutées (boussole, engrenage, pilier, réseau, fanion).
- 41 tests verts (9 fichiers). Build 236 Ko recopié vers coach-processus.html.
- Toujours pas de navigateur dans le bac à sable : rendu à vérifier par
  Lætitia.

### Prochain pas
- Retour visuel et pédagogique de Lætitia sur le geste Classer.
- Puis : geste 3 Mesurer (les trois paliers), ou variantes de scénarios,
  selon sa priorité.

## Session 1 (suite 2) — 2026-07-09 — Synthèse visuelle du geste Repérer (D12)

### Fait
- Retour visuel de Lætitia sur le premier build : trop de lecture. Refonte :
  récit en 8 vignettes illustrées (icône + phrase brève), candidats en cartes
  compactes (icône figurative + nom court), carte d'identité révélée après
  vérification (Entrée / Sortie / Client pour un processus, tampon de nature
  pour un leurre : Outil, Rôle, Cérémonie, Événement ponctuel).
- Domaine enrichi : NarrativeScene, ProcessIdentity, nature ; schéma Zod
  étendu (processus sans carte d'identité ou leurre sans nature = échec de
  build). Icônes : identifiants de données côté contenu, correspondance SVG
  côté UI, avec test de couverture corpus/icônes.
- 27 tests verts (7 fichiers). Build 224 Ko, recopié vers coach-processus.html.
- La règle D12 (icône figurative, jamais catégorielle) est le point de
  vigilance pédagogique de cette refonte : à re-vérifier à chaque nouveau
  scénario.
- Toujours pas de navigateur dans le bac à sable : rendu à vérifier par
  Lætitia (icônes dessinées à l'aveugle, ajustements probables).

### Prochain pas
- Retour visuel de Lætitia sur la version vignettes + cartes d'identité.
- Puis : variantes de scénarios Repérer, ou geste 2 Classer, selon sa
  priorité.

## Session 1 (suite) — 2026-07-09 — Cadrage validé, premier incrément jouable

### Fait
- Cadrage et contrat pédagogique validés par Lætitia ; D10 levée, D11 consignée
  (arbitrages du scénario Colibri : affinage opérationnel, borne au point
  d'engagement, cas de niveau programme conservé).
- Socle technique posé sur le modèle des coachs frères : vite single-file,
  vitest 3 projets (domain, corpus, ui), tsconfig strict, alias hexagonaux.
- Domaine codé : `ProcessCoachEngine` (façade), `SpottingEvaluator`
  (comparaison ensembliste, D5), `MasteryProgressor` repris de Coach Risques
  (D7), ports ContentRepository / MasteryStore / Clock / RandomSource.
- Corpus : scénario Colibri en données, validé par schéma Zod (échec bruyant),
  y compris la règle "aucun tiret long dans le contenu".
- UI Manufacture de nuit (D9, première incarnation) : hall à trois portes
  (une ouverte, deux "Atelier en préparation"), atelier Équipe agile
  (3 gestes, Repérer actif), plateau Repérer (récit sur papier clair,
  9 plaques-machines à bascule, feedback par candidat avec le pourquoi,
  message global aria-live, verdict toujours mot + forme, jamais couleur
  seule).
- 23 tests verts (6 fichiers) dont le canari d'isolation du domaine et le
  test corpus "corrigé atteignable". `tsc --noEmit` sans erreur.
- Build monofichier : 222 Ko (67 Ko gzip). Rituel de livraison respecté :
  `dist/index.html` recopié vers `coach-processus.html`.

### Limitation de session (à savoir)
- Aucun navigateur installable dans le bac à sable de cette session (réseau
  restreint) : la capture d'écran de vérification n'a pas pu être faite.
  Le rendu doit être vérifié par Lætitia en ouvrant `coach-processus.html` ;
  ajustements DA à prévoir après ce premier regard.

### Dette / à ne pas oublier
- ESLint boundaries non installé (le canari d'isolation couvre l'essentiel) ;
  à ajouter au prochain socle technique.
- Un seul scénario : les 2 variantes anti sur-apprentissage restent à écrire
  (la consolidation de maîtrise est inatteignable avec une seule signature,
  c'est voulu et connu).
- Théorie en fiches non commencée (prévue avec le geste Classer).

### Prochain pas
- Retour visuel de Lætitia sur `coach-processus.html` (DA Manufacture de nuit
  à confirmer ou ajuster, D9).
- Puis : variantes de scénarios Repérer, ou geste 2 Classer, selon sa
  priorité.

## Session 1 — 2026-07-09 — Cadrage initial

### Fait
- Cadrage V1 par dialogue structuré avec Lætitia : geste central (repérer,
  classer, mesurer en séquence), groupes V1 (équipe agile, train/programme,
  management/direction), mesure (métriques de flux articulées dans la chaîne
  KBI → KPI → KGI), doctrine hybride Lean + agile.
- Découpage proposé : parcours complet sur "équipe agile" d'abord (D1),
  autres groupes par pur ajout de contenu.
- Panel d'experts consulté en parallèle (pédagogie + doctrine, UX-UI +
  graphisme, architecture). Synthèses intégrées dans DOMAINE.md, DECISIONS.md
  et ROADMAP.md.
- Production : DOMAINE.md v0.1, DECISIONS.md (D1 à D10), ROADMAP.md,
  SCENARIO-01-proposition.md (fixture "L'équipe Colibri").

### En attente de validation par Lætitia (condition avant tout code, D10)
- DOMAINE.md v0.1 en entier, en particulier le glossaire (§4) et la règle des
  chaînes valides (§3).
- SCENARIO-01, dont ses trois points ouverts : classement de l'affinage du
  backlog, borne du temps de traversée, présence du niveau "programme" dès le
  scénario équipe.
- D1 (découpage V1) et D9 (direction artistique Manufacture de nuit, à
  confirmer ensuite sur MVP jouable).

### Prochain pas
- Recueillir les validations et corrections de Lætitia sur le fond.
- Puis : socle technique sur le modèle des coachs frères, et premier incrément
  jouable (geste "Repérer") présenté avant de continuer.

### Points de vigilance consignés
- Alignement strict des définitions KBI/KPI/KGI avec Coach Objectifs (aucune
  divergence entre outils).
- Garde-fou éthique : on mesure le flux, jamais les personnes (enseigné
  explicitement, anti-pattern n°10).
- "Support" jamais présenté comme moins noble que les autres types.
