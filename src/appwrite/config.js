import importEnv from "../config/importEnv";
import { Client, Account, ID, Databases, Query, Storage} from "appwrite";

export class Service{

    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(importEnv.appwriteUrl)
            .setProject(importEnv.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, images, status, userId}){
        try {
            return await this.databases.createDocument(
                importEnv.appwriteDatabaseId,
                importEnv.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    images,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ", error);
        }
    }


    async updatePost(slug, {title, content, image, status}){
        try {
            return await this.databases.updateDocument(
                importEnv.appwriteDatabaseId,
                importEnv.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error);
        }
    }


    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                importEnv.appwriteDatabaseId,
                importEnv.appwriteCollectionId,
                slug
            );
            return true
        } catch (error) {
            console.log("Appwrite service :: daletePost :: error ", error);
            return false
        }
    }

    
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                importEnv.appwriteDatabaseId,
                importEnv.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error ", error);
            return false
        }
    }


    async getPosts(quries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                importEnv.appwriteDatabaseId,
                importEnv.appwriteCollectionId,
                quries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error ", error);
            return false
        }
    }

    // File upload service

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                importEnv.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error ", error);
            return false
        }
    }


    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                importEnv.appwriteBucketId,
                fileId
            );
            return true
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error ", error);
            return false
        }
    }


    getFilePreview(fileId){
        return this.storage.getFileView(
            importEnv.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();

export default service