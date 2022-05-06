//When the API is growing and requires different controller methods
//specific for v2, for example, it would be a better idea to move the
//controllers folder into the v2 directory as well to have all specific
//logic for that particular version encapsulated.
//
//Another reason for that could be that we might change a service that
//is used by all other versions. We don't want to break things in the
//other versions. So it would be a wise decision to move the services folder
//also into a specific version folder.
