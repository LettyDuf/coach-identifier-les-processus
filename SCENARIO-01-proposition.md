# Scénario n°1 (proposition à valider) : L'équipe Colibri

Statut : PROPOSITION. Rien n'est figé tant que Lætitia n'a pas validé le fond
(exactitude des classements, des mesures et des feedbacks). Ce scénario servira
de fixture de référence pour les tests du domaine.

## Le récit

> L'équipe Colibri développe un logiciel de gestion pour des cabinets
> vétérinaires. Huit personnes : un Product Owner, une Scrum Master, cinq
> développeurs, une testeuse.
>
> Chaque matin à 9h15, l'équipe se retrouve pour son daily devant le tableau
> Jira. Quand un client signale un problème, sa demande arrive au support,
> est qualifiée, priorisée, corrigée, testée puis livrée : certaines demandes
> traversent tout cela en quatre jours, d'autres en six semaines. Le PO passe
> une partie de sa semaine à transformer les idées brutes en tickets prêts à
> développer, avec l'aide de la testeuse. Tous les trimestres, il rencontre
> les parties prenantes des deux autres équipes du produit pour arbitrer les
> priorités communes et les dépendances. En janvier, un pic de tickets a mis
> tout le monde sous l'eau. À chaque rétrospective, l'équipe choisit une
> amélioration, la tente, et vérifie au sprint suivant si elle a porté.
> Le mois dernier, une nouvelle développeuse est arrivée : entre la signature
> de son contrat et son premier correctif livré en autonomie, il s'est passé
> sept semaines.

## Geste 1 : repérer

Candidats proposés à l'apprenant (l'ordre sera mélangé par l'outil).

| Candidat | Verdict | Pourquoi (feedback) |
|---|---|---|
| Le traitement d'une demande client, de son arrivée au support à la livraison du correctif | Processus | Une entrée (la demande), une transformation répétée, une sortie livrée à un client. |
| L'affinage du backlog, de l'idée brute au ticket prêt | Processus | Répétable, avec une entrée (l'idée), une sortie (le ticket prêt) et un client (l'équipe qui développe). |
| L'amélioration continue, du constat en rétrospective à l'action vérifiée | Processus | Un cycle répétable avec une sortie vérifiable (l'amélioration qui a porté ou non). |
| L'intégration d'une nouvelle équipière, de la signature à l'autonomie | Processus | Une transformation répétable (chaque arrivée), bornée, avec une sortie claire (une personne autonome). |
| L'arbitrage trimestriel des priorités entre les trois équipes | Processus | Répétable, une entrée (les demandes concurrentes), une sortie (des priorités arbitrées). |
| Le daily de 9h15 | Distracteur | C'est une activité de pilotage à l'intérieur de processus plus larges : elle ne transforme pas une entrée en sortie livrée à un client. |
| Jira | Distracteur | C'est l'outil qui supporte le travail, pas le travail lui-même. Le processus existerait sans lui. |
| La testeuse | Distracteur | C'est un rôle. Un rôle participe à des processus, il n'en est pas un. |
| Le pic de tickets de janvier | Distracteur | C'est un événement ponctuel, pas une transformation répétable. |

## Geste 2 : classer

| Processus | Type | Niveau | Piège de confusion prévu |
|---|---|---|---|
| Traitement d'une demande client | Opérationnel | Équipe | Classé "support" parce que la demande arrive au support : le mot désigne un guichet, pas le type de processus. |
| Affinage du backlog | Opérationnel | Équipe | Classé "pilotage" parce que le PO décide : mais la sortie alimente directement ce que le client recevra. |
| Amélioration continue | Pilotage | Équipe | Classé "support" : non, il oriente la façon de travailler, c'est du pilotage. |
| Intégration d'une nouvelle équipière | Support | Équipe | Classé "opérationnel" : le client final ne reçoit rien directement de ce processus. |
| Arbitrage trimestriel des priorités | Pilotage | Programme | Classé niveau "équipe" : il implique trois équipes, il vit au niveau programme. |

## Geste 3 : mesurer (sur le traitement d'une demande client)

Banque de blocs proposée.

| Bloc | Nature | Timing | Feedback |
|---|---|---|---|
| Respect de la limite de travaux en cours | KBI | Leading | Un comportement que l'équipe contrôle chaque jour, et qui influence le temps de traversée. |
| Chaque correctif est relu par un pair avant fusion | KBI | Leading | Comportement contrôlable qui influence la qualité en aval. |
| Temps de traversée d'une demande, de la prise en charge à la livraison (métrique de flux) | KPI | Lagging sur l'item, pilotable en tendance | Mesure la performance du processus lui-même. |
| Débit : demandes livrées par semaine (métrique de flux) | KPI | Lagging en tendance | Mesure ce que le processus produit réellement. |
| Taux de demandes rouvertes après livraison | KPI | Lagging | Mesure la qualité de sortie du processus. |
| Note de satisfaction du client après résolution | KGI | Lagging | Le résultat visé : le client servi. On ne l'influence qu'à travers les KBI et KPI. |
| Taux d'occupation des développeurs | Piège | | On mesurerait les gens, pas le flux. Une équipe occupée à 100 % livre souvent plus lentement. |
| Vélocité comparée aux autres équipes | Piège | | La vélocité ne se compare jamais entre équipes ; utilisée ainsi, elle juge les personnes. |
| Nombre de lignes de code produites | Piège | | Mesure l'activité, pas la valeur. Plus de lignes n'est pas mieux. |

Exemple de chaîne valide : respect de la limite de travaux en cours (KBI) →
temps de traversée (KPI) → satisfaction du client (KGI). La règle du jeu :
exactement un KGI, au moins un KPI et un KBI, au moins un leading et un
lagging, et aucun bloc piège.

## Cartes d'identité (ajout D12, 2026-07-09)

Après vérification, chaque vrai processus révèle sa carte d'identité
(SIPOC allégé) ; chaque leurre révèle sa nature.

| Candidat | Entrée | Sortie | Client |
|---|---|---|---|
| Les demandes client | Un problème signalé par un client | Un correctif livré | Le client qui a signalé |
| L'affinage du backlog | Une idée brute | Un ticket prêt à développer | L'équipe qui développe |
| L'amélioration continue | Un constat en rétrospective | Une amélioration tentée et vérifiée | L'équipe elle-même |
| L'arrivée d'une équipière | Un contrat signé | Une équipière autonome | L'équipe qui l'accueille |
| L'arbitrage trimestriel | Les demandes concurrentes des trois équipes | Des priorités arbitrées | Les trois équipes du produit |

Natures des leurres : Le daily de 9h15 = Cérémonie ; Jira = Outil ;
La testeuse = Rôle ; Le pic de janvier = Événement ponctuel.

## Points que Lætitia doit trancher

1. Le classement de l'affinage du backlog en "opérationnel" (défendable en
   "pilotage" selon les écoles).
2. La borne du temps de traversée : de la prise en charge (point d'engagement,
   Anderson) ou de l'arrivée de la demande ? Proposition : point d'engagement,
   avec une fiche théorie qui explique la divergence entre écoles.
3. Le niveau "programme" introduit dès le scénario équipe (un seul cas, pour
   apprendre l'axe niveau) : le garder ou réserver l'axe niveau au groupe
   train/programme ?
