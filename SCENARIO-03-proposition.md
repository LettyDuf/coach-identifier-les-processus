# Scénario n°3 (proposition à valider) : la gestion de la demande transverse, ouverture du groupe "programme"

Statut : PROPOSITION, réécrite après le retour de Lætitia du 2026-07-09 sur la
première version (décor "train SAFe" écarté, voir DECISIONS D18). Rien n'est
codé tant que le fond ci-dessous n'est pas validé, comme pour Colibri
(SCENARIO-01). Ouvre le groupe "programme" ; ajout de contenu pur, aucun
domaine ni moteur à modifier (D8).

## Intention

Pas de train de livraison, pas d'équipes interdépendantes sur une release
commune : ce niveau, c'est l'ancrage déjà validé en D14, la vue médium de la
carte à trois zooms, "le processus transversal, qu'aucune équipe ne possède
seule". Le décor : des rôles transverses individuels (un gestionnaire de
portefeuille, deux analystes d'affaires, un architecte de solution), chacun
au service de plusieurs équipes de livraison, sans se considérer eux-mêmes
comme une équipe. Aucun nom de groupe : contrairement à Colibri et Harfang,
il n'y a pas d'identité collective à donner ici, c'est le point pédagogique
lui-même (le niveau "programme" ne suppose pas une équipe).

Le fil conducteur reprend l'exemple canonique déjà écrit au DOMAINE §2 bis :
la gestion de la demande, de sa réception à la vérification de la valeur en
service. Bénéfice : la fondation F2 (carte à trois zooms) et ce scénario
disent exactement la même chose, avec les mêmes mots.

Comme Colibri et Harfang, les trois types (pilotage, opérationnel, support)
sont représentés au niveau programme, pour démontrer ici le message clé du
DOMAINE §2 ("chaque type existe à chaque niveau") côté programme. Aucun cas
de niveau équipe ou direction n'est forcé dans ce scénario (D18) : direction
n'entre en jeu qu'à travers l'alignement des objectifs, ce n'est pas un
processus à classer ici.

## Geste 1 : repérer

| Candidat | Verdict | Nature (si leurre) |
|---|---|---|
| La gestion de la demande transverse, de la réception à la vérification de la valeur en service | Processus | |
| L'arbitrage trimestriel des priorités entre les demandes en attente | Processus | |
| La mise à disposition du référentiel d'architecture commun aux équipes | Processus | |
| L'outil de suivi du portefeuille de demandes | Leurre | Outil |
| L'architecte de solution transverse | Leurre | Rôle |
| La synchronisation hebdomadaire entre gestionnaires de la demande | Leurre | Cérémonie |
| Le gel de fin d'année sur les nouvelles demandes | Leurre | Événement ponctuel |

Cartes d'identité (SIPOC allégé, révélées après vérification) :

| Processus | Entrée | Sortie | Client |
|---|---|---|---|
| Gestion de la demande transverse | Un besoin métier brut, remonté par une direction ou un département | Une solution mise en service et vérifiée | La direction ou le département demandeur |
| Arbitrage trimestriel des priorités | Les demandes concurrentes en attente de traitement | Un ordre de priorité arbitré | Les équipes qui recevront le travail |
| Mise à disposition du référentiel d'architecture | Un besoin de cohérence technique remonté par une équipe | Des standards et patrons réutilisables, tenus à jour | Les équipes de livraison |

## Geste 2 : classer

| Processus | Type | Niveau | Piège de confusion prévu |
|---|---|---|---|
| Gestion de la demande transverse | Opérationnel | Programme | Classé "pilotage" parce qu'il y a de l'analyse et de la décision (qualifier, prioriser) : mais la sortie va jusqu'à la mise en service, c'est bien ce que le client demandeur attend. |
| Arbitrage trimestriel des priorités | Pilotage | Programme | Classé "opérationnel" parce qu'il produit un livrable concret (un ordre arbitré) : mais ce livrable oriente le travail des équipes, il ne va pas au client final. |
| Mise à disposition du référentiel d'architecture | Support | Programme | Classé "opérationnel" parce qu'il est utilisé au quotidien par les équipes : mais son client est interne, ce n'est pas le client final. |

## Geste 3 : mesurer (sur la gestion de la demande transverse)

Chaîne exemple : si chaque demande est qualifiée avec le gabarit standard dès
sa réception, alors elle se traduit plus vite en solution prête à confier à
une équipe, et la direction demandeuse reçoit une solution qui répond
vraiment à son besoin.

| Bloc | Nature | Timing | Feedback |
|---|---|---|---|
| Chaque demande est qualifiée avec le gabarit standard dès sa réception | KBI | Leading | Un comportement que les analystes contrôlent dès l'arrivée de la demande. |
| Chaque demande découpée est revue avec l'équipe qui la recevra avant d'être confiée | KBI | Leading | Comportement contrôlable qui influence la qualité de ce qui est confié. |
| Délai de traduction d'une demande en solution prête à confier (métrique de flux) | KPI | Lagging sur l'item, pilotable en tendance | Mesure la performance de la gestion de la demande elle-même. |
| Nombre de demandes en attente de qualification (travaux en cours) | KPI | Lagging en tendance | Mesure ce qui s'accumule avant traitement. |
| Taux de demandes qui repassent en clarification après un premier découpage | KPI | Lagging | Mesure la qualité de sortie du découpage. |
| Part des solutions livrées qui répondent au besoin métier initial, vérifiée en service | KGI | Lagging | Le résultat visé : la direction demandeuse est servie. On ne l'influence qu'à travers les KBI et KPI. |
| Nombre de demandes traitées par analyste | Piège | | Mesurerait l'activité d'une personne, pas le flux des demandes. |
| Taux d'occupation des analystes | Piège | | Mesurerait les gens, pas le flux. |
| Vélocité comparée entre analystes | Piège | | Ne se compare jamais entre personnes ; jugerait les gens plutôt que le flux. |

QCM Lire (proposition) : lecture en tendance du nombre de demandes en attente
de qualification (série qui grimpe malgré un délai de traduction stable : le
signal faible à surveiller) ; deux cadrans à lire ensemble (délai de
traduction stable mais taux de retour en clarification qui double : la
demande est traitée vite mais mal). QCM Choisir : question de la direction
demandeuse (KGI = part des solutions qui répondent au besoin, pas le nombre
de demandes traitées) ; signal avancé des analystes (qualification au
gabarit dès réception).

## Points à trancher par Lætitia

1. Les trois processus et leur classement (opérationnel/pilotage/support) :
   corrects, ou une des trois lectures te semble discutable sur ton terrain ?
2. Le nom du groupe et de la porte du hall : "programme" (vocabulaire du
   DOMAINE §2/§2 bis) te va, ou un intitulé plus parlant pour ton public ?
3. Nom exotique de l'outil de suivi du portefeuille (un des leurres) :
   proposition "Virelo", purement inventé, sans référence à une chose
   existante. À valider ou remplacer.
4. Les items de QCM Lire/Choisir : contenu proposé par Claude, à valider.

## Note technique (D8, pour information, non exécutée)

Ajout de contenu, pas de nouvelle brique de domaine : un dossier
`src/content/scenarios/programme/`, une porte de hall activée, un atelier
qui réutilise les trois gestes existants. Je ne code qu'après validation du
fond ci-dessus.
