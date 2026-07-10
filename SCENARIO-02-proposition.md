# Scénario n°2 (proposition à valider) : L'équipe Harfang

Statut : VALIDÉ en bloc par Lætitia le 2026-07-09, y compris le point
d'école n°1 (le type se juge du point de vue du processus et de son client
direct). Remplace le scénario Baobab (thème jugé trop éloigné du vécu des
publics). Encodé dans src/content/scenarios/equipe-agile/harfang.ts, jouable
(tirage aléatoire entre Colibri et Harfang à chaque geste).

Intention : un miroir des publics réels : une équipe de fondations TI d'une
grande organisation, qui gère un portefeuille d'outils aux genres
reconnaissables mais aux noms fictifs (règle validée : proche mais pas
identique, pour que l'outil n'ait jamais l'air de résoudre les questions du
vrai terrain à la place des gens) : Fluxo (moteur de processus), Sésame
(gestion des accès), Rouage (robots logiciels), Balise (adoption numérique),
Lanterne (minage de processus). Un PM, un architecte de plateforme, deux
architectes intégrateurs, quatre développeurs, douze équipes de livraison
clientes. La multiplicité des outils sert la leçon centrale : les processus
de l'équipe traversent tous les outils, ils ne se confondent avec aucun.
Signature de pièges distincte de Colibri (D7) : document, objectif,
département, indicateur.

## Geste 1 : repérer

| Candidat | Verdict | Nature |
|---|---|---|
| Les demandes de service (accès Sésame, workflow Fluxo, robot Rouage...) | Processus | |
| Les mises à jour des outils (production du jeudi) | Processus | |
| L'arbitrage d'architecture mensuel | Processus | |
| L'intégration d'un nouvel architecte | Processus | |
| La cellule d'incident multi-équipes | Processus | |
| Le dossier d'architecture de référence | Leurre | Document |
| L'objectif : délai de livraison réduit de moitié | Leurre | Objectif |
| La direction des infrastructures | Leurre | Département |
| La disponibilité des outils : 99,7 % | Leurre | Indicateur |

## Geste 2 : classer

| Processus | Type | Niveau | Piège prévu |
|---|---|---|---|
| Demandes de service | Opérationnel | Équipe | classé "support" (voir point 1 ci-dessous) |
| Mises à jour des outils | Opérationnel | Équipe | |
| Arbitrage d'architecture | Pilotage | Programme | classé niveau "équipe" |
| Intégration d'un nouvel architecte | Support | Équipe | classé "opérationnel" |
| Cellule d'incident multi-équipes | Opérationnel | Programme | classé niveau "équipe" |

Variation vs Colibri : deux processus de niveau programme (un pilotage, un
opérationnel), pour montrer l'indépendance des axes.

## Geste 3 : mesurer (le traitement d'une demande de service)

Chaîne exemple : si chaque demande est qualifiée sous 48 h par un architecte
intégrateur, alors les demandes se livrent plus vite, et les équipes de
livraison démarrent leurs projets à la date prévue.

KBI : qualification sous 48 h ; gabarit en libre-service pour les demandes
standard. KPI : délai de livraison (flux), demandes livrées par mois (flux),
taux de reprise. KGI : part des projets clients qui démarrent à la date
prévue. Pièges : occupation des architectes, comparaison entre architectes,
heures supplémentaires.

QCM Lire : lecture en tendance (série instable 9/2/8/3 %) ; deux cadrans à
lire ensemble (qualité stable mais délai d'ouverture qui double). QCM
Choisir : question de la direction (KGI démarrage des projets, pas le débit
d'accès) ; signal avancé de l'équipe (qualification sous 48 h).

## Points à trancher par Lætitia

1. LE point délicat : les demandes de service classées "opérationnel". La
   position assumée : le type se juge du point de vue du processus et de son
   client direct (l'équipe de livraison est le client d'Harfang, ce flux est
   donc l'opérationnel d'Harfang), même si, vue de l'entreprise entière, la
   plateforme est une fonction de soutien. Le message du piège "support"
   enseigne exactement cette nuance. À valider ou reformuler.
2. La cellule d'incident multi-équipes en "opérationnel de niveau programme".
3. Le leurre "objectif" : formulation du feedback ("une destination, pas un
   chemin").

## Reste à faire (hors bac à sable)

Supprimer l'ancien fichier depuis ton Terminal :
`rm src/content/scenarios/equipe-agile/baobab.ts` (vidé mais non supprimable
depuis le bac à sable).
