# Fiche "le processus vu du client" (proposition à valider)

Statut : PROPOSITION. Rien n'est codé tant que le fond n'est pas validé,
même règle que pour les scénarios.

## Décision d'architecture (la mienne, exposée)

Je ne crée pas une 5e fondation. Je rattache ce contenu à F2 "La carte à
trois zooms", en clôture de l'exploration de la carte (un nouvel écran de
synthèse après le zoom interactif, même schéma que F1 et F4 : ancrage,
mini-problème, leçon, renvoi à l'atelier). Raison : le concept est déjà semé
au DOMAINE §2 bis et dans zoomMap.ts (la case "Utiliser" dit déjà "c'est ici
que se mesure le vrai résultat, le KGI") ; l'éclater dans une fondation à
part dupliquerait la carte sans raison, et D16 a déjà écarté la scission
d'une fondation existante pour la même raison (dilution du hall). Ce n'est
pas une nouvelle brique, c'est la carte qui va au bout de son idée.

Conséquence technique si tu valides : aucun changement au type `FondationId`
ni au schéma des 4 fondations. Un nouveau contenu dans `zoomMap.ts` (ou un
fichier voisin), un nouvel écran dans `FondationView` pour le cas "carte".

## Le contenu proposé

### Ancrage

Le flux de production, c'est ce qu'on fait pour livrer : nos étapes, celles
de la carte. Le flux de consommation, c'est tout ce que le client traverse
pour résoudre complètement son problème, souvent plus long et plus large que
ce qu'on livre (Womack, Lean Solutions).

### Deux vignettes (apprendre par l'échec, comme F4)

**Vignette 1**
Contexte : L'équipe livre le correctif en quatre heures, un record de
vitesse. Mais le client attend encore trois jours : son propre service
informatique doit valider le déploiement avant de l'appliquer.
Question : Le temps de traversée interne (quatre heures) raconte-t-il ce que
le client a vécu ?
Options :
- Oui, il a eu son correctif en quatre heures (incorrect : confond livraison et résolution).
- Non, le flux de consommation du client continue après notre livraison (correct).
- Le service informatique du client n'est pas notre problème (incorrect : nier une partie du flux de consommation ne la fait pas disparaître).
Leçon : Notre flux de production s'arrête à la livraison. Le flux de
consommation du client continue au-delà, chez lui.

**Vignette 2**
Contexte : La release trimestrielle est livrée pile à la date annoncée,
fonctionnalité complète. Six semaines plus tard, l'équipe apprend que
presque personne ne l'utilise : personne n'avait prévu la formation des
utilisateurs.
Question : Livrer à temps garantit-il que le client a résolu son problème ?
Options :
- Oui, la date était tenue (incorrect : confond performance du processus et résultat chez le client).
- Non, l'adoption fait partie du parcours du client, pas seulement la livraison (correct).
- Non, il fallait livrer plus vite encore (incorrect : le problème n'est pas la vitesse, c'est le périmètre du flux mesuré).
Leçon : Un KPI excellent (livrer à temps) peut coexister avec un KGI raté
(le client n'a pas résolu son problème). Le résultat se vérifie chez le
client, jamais seulement chez nous.

### Synthèse

Le KGI se mesure toujours côté consommation, jamais seulement côté
production (DOMAINE §3 : le KGI est le résultat visé, on ne l'influence qu'à
travers les KBI et les KPI). C'est pourquoi le vrai résultat vit en vue
macro, à l'étape Utiliser de la carte : chez le client, la valeur se vérifie
ou s'effondre.

Deux questions pour se souvenir de repasser côté client :
- Le résultat qu'on mesure se vérifie-t-il chez le client, ou seulement chez nous ?
- Le flux qu'on a suivi s'arrête-t-il à notre livraison, ou continue-t-il jusqu'à la résolution complète du client ?

Renvoi (pas de duplication) : un rappel doux vers cette fiche depuis F4
Mesurer, à l'endroit où le KGI est présenté.

## Points à trancher par Lætitia

1. Le rattachement à F2 plutôt qu'une fiche séparée : d'accord, ou tu veux
   un accès indépendant depuis le bureau d'études ?
2. Les deux vignettes : exactitude et crédibilité pour ton public (TI grande
   organisation, cf la règle du miroir des publics).
3. Faut-il consigner un 11e anti-pattern au DOMAINE §6 ("mesurer la
   performance de production sans vérifier la consommation chez le
   client") ? Je n'ai rien ajouté seule, le §6 est une liste fermée à 10.
4. Le renvoi depuis F4 : un lien suffit, ou tu veux un extrait du contenu
   directement dans F4 (au risque de dupliquer, ce que D16 déconseille) ?
