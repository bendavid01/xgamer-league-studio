# XGamer 2.0 access boundary

Private applications, contact data, OAuth identities, coordinator assignments and finals credentials live only in the web application's private PostgreSQL database. Do not add these fields to the public production Sanity dataset.

The existing Sanity dataset and content remain unchanged. The Control Center is at https://xgamer-league-web.vercel.app/admin. Registration and organizer access remain closed until the owner configures the database, Discord OAuth and exactly two main admin Discord IDs.

## Sanity permissions are a separate security boundary

Hiding a Studio action does not revoke API permissions. Before inviting any coordinator, configure a Sanity custom role with only the assigned document resources and read/create/update permissions, without delete, project administration, user management or token management. Do not give coordinators Sanity Administrator or Editor as a shortcut. Test direct API deletion with the coordinator's actual identity and confirm rejection.

Sanity role capabilities depend on the project plan. If the available plan cannot enforce the required no-delete permission, coordinators must use the private Control Center only and receive no Sanity write access. Existing membership and credentials have not been changed by this release; the owner must review any pre-existing coordinator access before launch.

The existing match soft-delete action is an editorial convenience, not a backend authorization control. Keep the two existing main admins' access intact while mapping their verified Sanity identities; Discord IDs and Sanity member IDs are different identifiers.

Source: https://www.sanity.io/docs/user-guides/roles
