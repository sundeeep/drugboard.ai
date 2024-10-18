"use client";
import { Databases, Client, ID } from "appwrite";
import { databaseID, postDraftsID, postFilesID, postLinksID, postsID, postTagsID } from "../constants";

const databases = new Databases(Client);

const collections = [
    {
        'databaseID': databaseID,
        '$id': postsID,
        'name': 'posts'
    },
    {
        'databaseID': databaseID,
        '$id': postDraftsID,
        'name': 'postDrafts'
    },
    {
        'databaseID': databaseID,
        '$id': postFilesID,
        'name': 'postFiles'
    },
    {
        'databaseID': databaseID,
        '$id': postLinksID,
        'name': 'postLinks'
    },
    {
        'databaseID': databaseID,
        '$id': postTagsID,
        'name': 'postTags'
    }
];

const db = {};

collections.forEach((collection)=>{
    db[collection.name] = {
        createDoc: async (PAYLOAD={}, PERMISSIONS=[]) => {
            const newDoc = await this.db.createDocument(
              collection.databaseID,
              collection.$id,
              ID.unique(),
              PAYLOAD,
              PERMISSIONS
            );
            return newDoc;
        },

        getAllDocs: async (QUERIES=[]) => {
            const docs = await databases.listDocuments(
                collection.databaseID,
                collection.$id,
                QUERIES
            );
            return docs;
        },

        getDoc: async (DOCUMENT_ID, QUERIES=[]) => {
            const doc = await databases.getDocument(
                collection.databaseID,
                collection.$id,
                DOCUMENT_ID,
                QUERIES
            );
            return doc;
        },
    }
})