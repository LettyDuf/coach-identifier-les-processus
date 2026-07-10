# DECISIONS — Coach Processus

Format : contexte, choix, alternative écartée. Trois lignes par décision.

## D1 — Découpage V1 : un groupe complet plutôt que trois groupes minces
Contexte : trois groupes retenus (équipe agile, train/programme, direction), parcours en trois gestes, mesure articulée.
Choix : V1 = parcours complet jouable sur "équipe agile" seul ; les deux autres groupes visibles dans la navigation ("atelier en préparation") et ajoutables par pur contenu.
Écarté : livrer les trois groupes en parallèle (aucun ne serait jouable de bout en bout). Statut : proposé par Claude, à valider.

## D2 — Doctrine hybride Lean + agile
Contexte : plusieurs référentiels possibles pour typer les processus.
Choix : typologie ISO/AFNOR (pilotage, opérationnel, support) comme colonne vertébrale, illustrée par les cadres agiles ; lecture flux pour la mesure. Sources consignées dans DOMAINE.md §7.
Écarté : tout-agile (typologie absente des cadres) ou tout-ISO (trop loin du vécu du public). Validé par Lætitia au cadrage.

## D3 — Trois gestes en séquence, un geste par écran
Contexte : risque de surcharge cognitive du parcours repérer, classer, mesurer.
Choix : chaque geste est un écran jouable et rejouable indépendamment ; le scénario reste accessible en panneau escamotable ; type et niveau ne se classent jamais simultanément.
Écarté : un écran unique portant les trois gestes. Validé par Lætitia (option "les deux, en séquence").

## D4 — Métriques de flux = instances de KPI
Contexte : articuler métriques de flux Lean et chaîne KBI → KPI → KGI sans créer un modèle à quatre étages.
Choix : une métrique de flux est un attribut d'un bloc KPI (isFlowMetric), avec feedback dédié. Définitions KBI/KPI/KGI strictement alignées sur Coach Objectifs.
Écarté : un quatrième type de bloc "métrique de flux". Validé par Lætitia (option "les deux articulés").

## D5 — Repérage par sélection de candidats, jamais de saisie libre
Contexte : évaluer le repérage de processus dans un récit de façon déterministe et testable.
Choix : le scénario expose des candidats sélectionnables (processus réels + distracteurs typés : outil, rôle, cérémonie, événement), comparaison ensembliste avec le corrigé, feedback par candidat.
Écarté : saisie libre analysée par heuristiques textuelles (non déterministe, non testable).

## D6 — Chaînes de mesure valides déclarées dans le contenu
Contexte : plusieurs chaînes de mesure sont défendables pour un même processus.
Choix : le contenu déclare un ensemble fini de chaînes valides ; le moteur vérifie les règles structurelles (un KGI exactement, au moins un KPI et un KBI, un leading et un lagging, aucun piège).
Écarté : solveur générique de cohérence (sur-ingénierie, injustifiable pédagogiquement).

## D7 — Réutilisation du modèle de maîtrise de Coach Risques
Contexte : trois outils frères partagent déjà un modèle de progression qualitatif (4 niveaux, consolidation par signatures).
Choix : reprendre tel quel Mastery + MasteryProgressor, la config vitest à trois projets (domain, corpus, ui) et la config vite single-file ; store de maîtrise en mémoire en V1.
Écarté : nouveau modèle de progression (aucun besoin nouveau) ; localStorage en V1.

## D8 — Le groupe de travail est une donnée, pas un enum du domaine
Contexte : promesse "ajouter un groupe sans toucher au code".
Choix : WorkGroupId est une chaîne validée côté contenu ; ajouter un groupe = un dossier de contenu + une ligne d'index. Type et niveau restent des enums du domaine (stables conceptuellement).
Écarté : enum des groupes dans le domaine (rendrait la promesse fausse).

## D9 — Direction artistique "Manufacture de nuit"
Contexte : trois directions proposées par le panel (manufacture hextech, réseau d'écluses, vaisseau) ; brief immersif laiton sur nuit, refus du plat.
Choix : la Manufacture de nuit : chaque processus est une machine (trémie d'entrée, corps, bec de sortie), la chaîne de mesure est une rangée de manomètres, palette nuit/laiton/cuivre, typo Marcellus + Lora. On emprunte au vaisseau la coupe par ponts pour le plateau de classement.
Écarté : écluses (registre parchemin déjà jugé fade), vaisseau seul (faible sur le geste mesurer). Statut : recommandé par le panel, à valider sur MVP jouable.

## D10 — Pas de code avant validation
Contexte : règle structurante du projet, déjà appliquée aux coachs frères.
Choix : aucun code tant que DOMAINE.md v0.1 et SCENARIO-01 ne sont pas validés par Lætitia (dont les trois points ouverts du scénario).
Écarté : prototyper en parallèle de la validation (risque d'ancrer du contenu faux).
Levée le 2026-07-09 : cadrage et contrat pédagogique validés par Lætitia ("ok vas y").

## D11 — Arbitrages du scénario Colibri (validés avec le cadrage, 2026-07-09)
Contexte : trois points ouverts dans SCENARIO-01, propositions de Claude retenues par la validation globale.
Choix : affinage du backlog classé opérationnel (sa sortie alimente directement ce que le client recevra) ; temps de traversée borné au point d'engagement (Anderson), divergence entre écoles expliquée en fiche théorie ; un cas de niveau programme conservé dès le scénario équipe pour enseigner l'axe niveau.
Écarté : affinage en pilotage, borne à l'arrivée de la demande, axe niveau réservé au groupe train. Réversible si Lætitia revient sur un point à l'usage.

## D12 — Synthèse visuelle : vignettes illustrées et cartes d'identité
Contexte : premier retour visuel de Lætitia (2026-07-09), le récit en pavé et les cartes longues imposent trop de lecture.
Choix : le récit devient des vignettes illustrées (icône + texte bref) ; les candidats deviennent des cartes compactes (icône figurative + nom court) qui révèlent après vérification leur carte d'identité : Entrée / Sortie / Client pour un processus (le SIPOC allégé du DOMAINE §1), tampon de nature pour un leurre. Règle : l'icône représente la chose, jamais sa catégorie, sinon l'exercice se répond tout seul.
Écarté : icônes catégorielles (leak de la réponse) ; carte d'identité visible avant vérification (même raison, l'asymétrie processus/leurre trahirait le verdict).

## D16 — Architecture : le bureau d'études et la règle d'urbanisme
Contexte : diagnostic de Lætitia après plusieurs itérations sur Mesurer : "pourquoi on mesure, comment, pour qui" touche tous les domaines, l'activité était mal placée, les incohérences s'accumulaient ("trois familles" flottait sans ancrage). Panel consulté (pédagogue 4C/ID + UX).
Choix : deux espaces. Le bureau d'études au hall héberge les fondations transversales, chacune ouverte par un mini-problème : F1 Qu'est-ce qu'un processus (votes + les trois tests), F2 La carte à trois zooms, F3 La grille type x niveau, F4 Mesurer un processus : pourquoi, comment, pour qui (situations d'échec + familles d'INDICATEURS + qui-utilise-quoi, en deux volets). Les ateliers redeviennent du pur entraînement (Mesurer : Lire, Choisir, Construire). Liens : fondation liée affichée sur chaque geste (lampe visitée, "conseillé avant", jamais bloquant), renvois repliables dans les gestes, clôture des fondations par "aller à l'atelier". Règle d'urbanisme : toute compréhension transversale va au bureau d'études, tout entraînement contextuel aux ateliers. Ancrage de vocabulaire : toujours "familles d'indicateurs", et la phrase "un indicateur appartient à une famille selon qui le lit et à quelle cadence".
Écarté : parcours de fondations imposé avant l'atelier (bloquer un adulte volontaire tue la motivation) ; fusion F2/F3 (recréerait la confusion type/niveau) ; scission de F4 en deux fondations (diluerait le hall) ; "la salle des plans" comme nom (n'évoque que la carte).
Dette consignée : renvoi contextuel déclenché après deux échecs sur un même exercice (deep-link + retour), recommandation du panel non encore implémentée.
Dette levée le 2026-07-09 : composant `RenvoiApresEchecs` (jamais bloquant, seuil 2 échecs consécutifs), navigation `returnTo` dans `App.tsx` pour revenir à l'exercice après consultation de la fondation en entier. Voir STATUS.

## D15 — Geste Mesurer : trois paliers, chaîne par sélection de blocs
Contexte : dernier geste du parcours ; marche pédagogique la plus haute (DOMAINE §5), risque de décrochage sans palier de lecture.
Choix : trois paliers séquencés : lire une mesure (QCM sur des chiffres réels du scénario), choisir la bonne métrique (QCM avec pièges), construire la chaîne (sélection d'un ensemble de blocs, règles structurelles du DOMAINE §3 vérifiées par le moteur, message de la première violation dans l'ordre pédagogique : piège d'abord). La nature des blocs (KBI/KPI/KGI/piège) n'est révélée qu'après la mise en service (même logique anti-leak que D12). Réussite de la chaîne = passe de maîtrise du module mesurer. Sur succès, le fluide circule (animation, coupée par prefers-reduced-motion).
Écarté : chaîne ordonnée par glisser-déposer (l'ordre n'ajoute rien pédagogiquement, la couverture oui) ; solveur générique (D6 déjà) ; mini-simulation "le comptoir" (reportée, réévaluable après usage). Quiz des paliers 1-2 : contenu proposé par Claude, à valider par Lætitia.

## D14 — La carte à trois zooms et sa triade de noms
Contexte : question de Lætitia (où cartographier la consommation du client, qui identifie quoi) ; son idée de vues emboîtées macro/médium/micro par rôle retenue contre la fresque à deux rives de Claude ; collision de vocabulaire détectée par elle sur "opérationnel".
Choix : fiche théorie "La carte à trois zooms" : processus d'affaires (macro, parcours client, direction), processus transversal (médium, gestion de la demande ou flux correctif, gestion de produit), processus d'équipe (micro, l'équipe). "Opérationnel" est réservé à l'axe type, jamais un niveau. Chaque case est zoomable ou explicable ; sortie de zoom par pastille "↑ fermer" dans la case, clic sur niveau estompé, ou Échap. Mockup validé (mockup-carte-trois-zooms.html), simulations jsdom des interactions.
Écarté : fresque production/consommation (rejetée par Lætitia) ; "flux de valeur opérationnel" et "processus opérationnel" comme titres de niveaux (collision avec l'axe type) ; gros bouton "Remonter" (jugé envahissant).
Complément (même jour) : placée au hall, section visible "Le plan de la manufacture", et retirée de l'atelier. Décidé avec Lætitia : la carte explique pourquoi la manufacture a trois ateliers (une porte par niveau de zoom), elle oriente avant le choix de la porte. Écarté : panneau replié en bas d'atelier (trop tard, trop caché).

## D17 — Le type se juge du point de vue du processus, pas de l'entreprise
Contexte : scénario Harfang, les demandes de service d'une équipe de fondations classées "opérationnel" alors que l'entreprise voit cette équipe comme une fonction de soutien.
Choix : le type se juge du point de vue du processus et de son client direct ; le piège "support" enseigne cette nuance. Position validée en bloc par Lætitia avec SCENARIO-02.
Écarté : juger le type du point de vue de l'entreprise entière (aurait classé toute équipe de plateforme en "support", contredisant sa propre expérience terrain).

## D19 — Filigrane de rouages en fond, ton sur ton
Contexte : panel DA sur le build réel (2026-07-09) : le hall et les ateliers tiennent la palette nuit/or mais restent plats, sans profondeur (D9 recommandé mais jamais confirmé sur l'outil). Trois pistes de mockup proposées (rouages, plans hextech, grain de laiton) ; Lætitia retient les rouages, mais juge le premier essai trop contrasté (trait laiton sur fond nuit, capte le regard).
Choix : motif de rouages en filigrane sur `body::before`, dans la même famille de bleu-nuit que le fond (trait `#232b36`, quasi invisible), jamais le laiton contrasté. Validé sur `mockup-texture-filigrane.html` variante A2. Structure et composants inchangés : seul le fond gagne en texture.
Écarté : plans hextech et grain de laiton (non retenus par Lætitia) ; premier essai rouages en laiton contrasté (capte le regard, contraire à l'effet de matière recherché). Reste ouvert : le fond crème des cartes Repérer et de l'encart Mesurer, qui casse la même immersion (constat du panel, non traité ici).

## D18 — Le niveau "programme" reflète le processus transverse, pas un train SAFe
Contexte : scénario 3 initialement construit sur un modèle de train de livraison SAFe (releases coordonnées, dépendances inter-équipes) ; retour de Lætitia (2026-07-09) : contexte réel incertain sur SAFe (pas encore décidé de continuer), pas de livraisons communes entre équipes, les acteurs de ce niveau sont des rôles individuels transverses, pas une équipe constituée.
Choix : le niveau "programme" reprend l'ancrage déjà validé en D14 (processus transversal, vue médium, exemple canonique "la gestion de la demande" : recevoir, qualifier, prioriser, traduire en solution, confier aux équipes, vérifier la valeur en service), sans hypothèse de synchronisation façon SAFe. Grille d'exemples DOMAINE §2 corrigée en conséquence. Décor du scénario 3 : des rôles transverses individuels, aucun nom d'équipe ni cas de niveau équipe forcé.
Écarté : décor "train de livraison" façon SAFe (suppose des dépendances et releases communes qui n'existent pas chez elle) ; intégration d'une équipe complète comme exemple (les acteurs de ce niveau ne se vivent pas comme une équipe) ; forcer un cas de niveau direction (l'alignement aux objectifs de direction n'est pas lui-même un processus à classer, D14 le réserve déjà à son propre niveau).

## D13 — Geste Classer : le pattern Tri, un axe à la fois
Contexte : geste 2 à rendre jouable ; le plateau croisé 3x3 (travées et ponts) impose une double décision, contre le DOMAINE §5.
Choix : pattern Tri repris de Coach Risques : une carte-processus à la fois, trois cibles avec picto et question vulgarisée, raccourcis 1/2/3, feedback immédiat. Deux phases séquencées : tout le type d'abord, puis tout le niveau. Réussite du parcours = tout juste du premier coup ; les messages de confusion par mauvaise case vivent dans le corpus (typeTraps/levelTraps), le schéma refuse un piège posé sur la bonne case. Les guides d'axes (questions d'aide) sont des données de contenu.
Écarté : plateau croisé type x niveau en un seul geste (surcharge, D3) ; glisser-déposer (plus coûteux, moins accessible que trois cibles cliquables, réévaluable après retour terrain).
