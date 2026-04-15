# Page de monitoring chat — Contexte

## URL
`/usf-live-chat-x7k4m` (URL obscure = accès difficile volontairement)

## Fichiers
- `page.tsx` — page principale (server component Next.js)
- `UserDropdown.tsx` — dropdown interactif par user (client component)
- `DateRangePicker.tsx` — date picker principal haut droite (client component)
- `GrowthPicker.tsx` — date picker pour le graphe de croissance (client component)
- `CONTEXT.md` — ce fichier

## Variables d'environnement (ultra-sports-fans-web/.env)
- `SUPABASE_URL` — URL Supabase
- `SUPABASE_ANON_KEY` — clé publique (chat_messages, nhl_team_chat_messages, matches_cache, teams)
- `SUPABASE_SERVICE_ROLE_KEY` — clé admin (reported_messages, profiles, bypass RLS)

## Ce qui est affiché

### Row 1 — 2 cards
- **Actifs (30 min)** : users uniques ayant écrit dans les 30 dernières minutes (chat_messages + nhl_team_chat_messages)
- **Users actifs** : users uniques ayant écrit dans le date range sélectionné

### Row 2 — 2 colonnes
- **Messages** :
  - Total combiné matchs + équipes
  - CHAT MATCHS : badges par match (ex: MTL vs TBL — 5) + dropdown par user avec label match en bleu
  - CHAT ÉQUIPES : badges par équipe (ex: BOS — 2) en vert + dropdown par user avec label équipe en vert
  - Dropdown : heure + [équipe/match] + contenu du message
- **Signalés** :
  - Table `reported_messages` (service_role key)
  - Username signalé (rouge) + username signaleur + heure + contenu du message
  - Section **Bannis** en bas : profiles où `is_banned = true`

### Bas de page — Inscriptions
- Nouveaux inscrits du jour + total cumulatif
- GrowthPicker : boutons 7j / 30j / Tout + date range custom
- Graphe barres horizontales par jour

## Détails techniques importants
- **Timezone** : toujours `-04:00` (EDT Montréal). Sans offset, messages après 20h local apparaissent dans "demain" car le serveur est UTC
- **URL params** : `from`/`to` pour le range principal, `gfrom`/`gto` pour le graphe de croissance
- **Jointures** : pas de join Supabase REST (échouent silencieusement) — fetch séparés puis merge en JS
- `chat_messages.match_id` = UUID de `matches_cache.id`
- `nhl_team_chat_messages.team_id` = `teams.goalserve_id`
- `profiles.is_banned = true` = user banni (affiché dans BannedModal dans l'app mobile)

## Reste à faire
- **Bouton bannir** depuis la page (Server Action Next.js, pas API route — user préfère pas d'API route)
- **Auto-refresh** toutes les 60s sans F5
- **Retention** : users revenus aujourd'hui vs nouveaux
