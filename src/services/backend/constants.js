export const endpoint = process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT;
export const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

//appwrite databases
export const databaseID = process.env.NEXT_PUBLIC_DRUGBOARD_AI_DBID

//appwrite tables
export const postsID = process.env.NEXT_PUBLIC_POSTS_TABLE;
export const postDraftsID = process.env.NEXT_PUBLIC_POSTS_DRAFTS_TABLE;
export const postLinksID = process.env.NEXT_PUBLIC_POSTLINKS_TABLE;
export const postFilesID = process.env.NEXT_PUBLIC_POSTFILES_TABLE;
export const postTagsID = process.env.NEXT_PUBLIC_POSTTAGS_TABLE;

export const usersID = process.env.NEXT_PUBLIC_USERS_TABLE;

//appwrite functions
export const getAllUsersFuncID = process.env.NEXT_PUBLIC_GETALLUSERS_FUNCID;
export const getUserByIDFuncID = process.env.NEXT_PUBLIC_GETUSERBYID_FUNCID;

export const srcURL = process.env.NEXT_PUBLIC_SRC_URL;
export const destURL = process.env.NEXT_PUBLIC_DEST_URL;