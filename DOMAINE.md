# DOMAINE — Coach Processus (v0.1, à valider par Lætitia)

Source de vérité pédagogique. Rien n'est figé sans validation explicite.
Aucun contenu de ce fichier ne doit être codé en dur : tout vit en données.

## 1. Tronc commun : qu'est-ce qu'un processus

Un processus est une transformation répétable : une entrée, une suite
d'activités, une sortie livrée à un client (interne ou externe). Trois tests
simples pour l'apprenant :

1. Y a-t-il une entrée qui déclenche et une sortie livrée ? (bornage)
2. Est-ce que cela se répète ? (un événement ponctuel n'est pas un processus)
3. Quelqu'un attend-il la sortie ? (pas de client, pas de processus)

Distinctions fondatrices, dans l'ordre d'apprentissage :

- Processus vs activité : l'activité est un maillon, le processus va de bout
  en bout. Le daily est une activité, pas un processus.
- Processus vs outil : Jira n'est pas le processus, il le supporte.
- Processus vs organigramme : un processus traverse les départements ; le
  département héberge, il ne borne pas.
- Un processus non documenté existe quand même.

Véhicule pédagogique du bornage : SIPOC allégé (fournisseur, entrée,
transformation, sortie, client).

## 2. Classification à deux axes

Axe 1, le type (typologie ISO 9001 / AFNOR FD X50-176) :

- Pilotage : oriente et décide (amélioration continue, arbitrage de priorités).
- Opérationnel : produit directement ce que le client attend (traitement d'une
  demande, affinage du backlog).
- Support : fournit les moyens aux autres processus (intégration d'un nouvel
  équipier, achats, IT interne).

Test de classement vulgarisé : "est-ce que ça produit directement ce que le
client attend ?" Oui : opérationnel. Non mais ça décide comment on travaille :
pilotage. Non mais ça fournit des moyens : support.

Garde-fou pédagogique : "support" n'est jamais présenté comme moins noble.

Point de vue du classement (D17, validé 2026-07-09 sur le scénario Harfang) :
le type se juge du point de vue du processus et de son client direct, jamais
de l'entreprise entière. Une équipe de fondations qui traite des demandes de
service (accès, workflows, robots) classe ce flux en opérationnel : c'est ce
qu'elle produit pour son client direct, même si, vue de l'entreprise entière,
cette équipe est perçue comme une fonction de soutien. Le piège "support"
enseigne exactement cette nuance.

Axe 2, le niveau : équipe, programme (multi-équipes), direction. Les deux axes
sont indépendants et ne se classent jamais en même temps (un axe à la fois).

Point de vigilance doctrinal : la grille ISO (système de management) et la
grille Lean (flux de valeur transversal) se croisent sans se confondre. L'outil
assume la grille ISO pour classer, et la lecture flux pour mesurer.

Message clé enseigné : les deux axes sont indépendants, chaque type existe à
chaque niveau. Le type dit ce que le processus fait ; le niveau dit où il vit.

Grille d'exemples (théorie affichée à la demande ; PROPOSITION à valider) :

| | Équipe | Programme | Direction |
|---|---|---|---|
| Pilotage | Boucle d'amélioration continue (rétro, action, vérification) | Arbitrage des priorités entre les demandes transverses en attente | Revue stratégique qui alloue les budgets |
| Opérationnel | Traitement d'une demande client, de l'arrivée à la livraison | La gestion de la demande transversale, de la réception à la mise en service | Parcours complet d'un client, de la commande à la facturation |
| Support | Intégration d'une nouvelle équipière | Plateforme commune mise à disposition des équipes | Recrutement, paie, achats |

## 2 bis. La carte à trois zooms (validée sur mockup le 2026-07-09)

Les processus s'emboîtent comme des niveaux de zoom sur une même carte, et
chaque rôle est responsable d'identifier les processus à son niveau :

- Vue macro : le processus d'affaires, le parcours que le client traverse de
  bout en bout (Découvrir, Choisir, Commander, Démarrer, Utiliser, Obtenir de
  l'aide, Renouveler ou quitter). Identifié par la direction, observé chez le
  client. Synonyme à reconnaître : flux de valeur opérationnel (SAFe).
- Vue médium : le processus transversal, qui traverse plusieurs équipes et
  qu'aucune ne possède seule (ex. la gestion de la demande : recevoir,
  qualifier le besoin, estimer la valeur, prioriser, analyser et traduire en
  solution TI, découper en fonctionnalités, confier aux équipes, vérifier la
  valeur en service ; ou le flux correctif). Identifié par la gestion de
  produit, avec les équipes traversées. Synonyme : flux de valeur de
  développement (SAFe).
- Vue micro : le processus d'équipe, vécu à l'intérieur d'une seule équipe
  (réaliser une fonctionnalité, traiter un correctif). Identifié par l'équipe
  elle-même, qui doit connaître les zooms du dessus pour ne pas optimiser sa
  case en aveugle.

Chaque case de la carte est soit zoomable (elle s'ouvre en vue suivante),
soit explicable (une explication courte). Le flux de consommation (Womack,
Lean Solutions) vit en vue macro : c'est là que se mesure le vrai résultat
(le KGI), et c'est pourquoi il ne se cartographie jamais au niveau équipe.

Règle de vocabulaire (D14) : "opérationnel" est réservé à l'axe type de la
grille et ne désigne jamais un niveau. Un processus d'équipe n'est pas
forcément de type opérationnel (la boucle d'amélioration est un processus
d'équipe de type pilotage).

Statut : concept, triade de noms, mécanique ET étapes détaillées validés en
bloc par Lætitia le 2026-07-09. Contenu encodé dans src/content/zoomMap.ts.

## 3. La chaîne de mesure

Reprend la chaîne du Coach Objectifs (mêmes définitions, aucune divergence
autorisée entre les deux outils) :

- KBI : comportement observable, contrôlable par l'équipe, leading.
- KPI : performance du processus lui-même. Les métriques de flux (temps de
  traversée, débit, travaux en cours, taux de reprise) sont des instances de
  KPI, pas un quatrième type.
- KGI : atteinte du résultat visé, lagging. On ne l'influence qu'à travers
  les KBI et KPI.

Règles d'un dispositif de mesure valide (encodées dans le moteur) :

1. Exactement un KGI.
2. Au moins un KPI et au moins un KBI.
3. Au moins un indicateur leading et au moins un lagging.
4. Aucun bloc piège (occupation, comparaison entre équipes, volume d'activité).

Garde-fou éthique enseigné explicitement : on mesure le flux des demandes,
jamais les personnes.

## 4. Glossaire tranché (proposition, à valider)

- Temps de traversée (lead time) : du point d'engagement (la demande est prise
  en charge) à la livraison. La divergence entre écoles (arrivée de la demande
  vs engagement) est expliquée en fiche théorie, pas cachée.
- Débit (throughput) : nombre d'éléments livrés par unité de temps.
- Travaux en cours (WIP) : éléments engagés non livrés.
- Lecture en percentiles, jamais en moyenne seule (Vacanti).

## 5. Progression pédagogique

Séquence en spirale sur un même scénario, un geste par écran, sessions de 12 à
18 minutes :

1. Repérer : d'abord "ça existe", puis les bornes, puis la sortie produite.
2. Classer : le type d'abord, le niveau ensuite, jamais les deux ensemble.
3. Mesurer, en cinq paliers (révision du 2026-07-09, sur retours de Lætitia :
   le sens avant les définitions, les définitions avant l'usage) :
   1. Pourquoi trois familles : ressentir le besoin par l'échec (un tableau
      de bord à une seule aiguille), puis la complémentarité (le levier,
      l'effet, le but) et qui utilise quoi, à quelle cadence.
   2. Les trois familles : apprendre à reconnaître KBI, puis KPI, puis KGI,
      chacune par son test vulgarisé et le jugement d'items.
   3. Lire une mesure donnée (percentiles, loi de Little).
   4. Choisir la bonne métrique pour une question posée.
   5. Construire la chaîne KBI → KPI → KGI (au plus 4 blocs : un tableau de
      bord qui mesure tout ne pilote rien).
   La VSM complète reste en théorie illustrée, on ne la fait pas construire
   en V1.

## 6. Anti-patterns à encoder (10)

1. Confondre le processus et l'outil (Jira n'est pas le processus).
2. Confondre le processus et l'organigramme.
3. Confondre le processus et la cérémonie (le daily n'est pas la livraison).
4. Croire qu'un processus non documenté n'existe pas.
5. Borner trop court (démarrer au développement plutôt qu'à la demande).
6. Confondre l'activité et sa sortie (pas de client, pas de processus).
7. Mesurer l'occupation des personnes plutôt que le flux des demandes.
8. Ignorer que le temps de traversée est surtout de l'attente.
9. Piloter à la moyenne plutôt qu'aux percentiles.
10. Utiliser la métrique pour juger les gens (vélocité comparée, chiffres
    pastèques).

## 7. Sources doctrinales

Cattan, Idrissi, Knockaert "Maîtriser les processus de l'entreprise" (typologie
ISO / AFNOR) ; George et Maxey "Lean Six Sigma Pocket Toolbook" (SIPOC) ;
Rother et Shook "Learning to See" et Martin et Osterling "Value Stream Mapping"
(VSM, dont l'adaptation au travail de la connaissance) ; Vacanti "Actionable
Agile Metrics for Predictability" (métriques de flux, percentiles) ; Reinertsen
"The Principles of Product Development Flow" (files d'attente) ; Anderson
"Kanban" (point d'engagement) ; COBIT (couple KGI/KPI) et Rother "Toyota Kata"
(comportements amont, fondement des KBI).

Honnêteté doctrinale : la chaîne KBI → KPI → KGI est une grille de lecture
assemblée, pas un standard publié. L'outil la présente comme telle.

## 8. Fixtures

- Scénario n°1 : "L'équipe Colibri" (voir SCENARIO-01-proposition.md). Sert de
  fixture de référence pour les tests du domaine une fois validé.
- Prévoir 2 à 3 variantes du même groupe dès la V1 pour éviter le
  sur-apprentissage du récit.
