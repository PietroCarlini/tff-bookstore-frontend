export interface Book {
    id:string,
    title: string,
    authors: Array<string>,
    isbn: string,
    cover: string | null // string or null 
}

export interface BookDetails extends Book {
    publisher: string,
    pubDate: string,
    description: string,
}