import { BookStocked, NewBookData } from '@/types/bookshopTypes';


const API_URL = process.env.API_URL;

// bookshop retrieves its own catalogue, optionally filtered by search
export async function getCatalogue(token: string, search?: string, sortBy?: string, sortDir?: string): Promise<BookStocked[]> {

    const params = new URLSearchParams(); //it's an obj
    if(search) params.set('search', search);
    if(sortBy) params.set('sortBy', sortBy);
    if(sortDir) params.set('sortDir', sortDir)

    let url = `${API_URL}/catalogue`;
    
    //we check, if the obj not emptu, we add the query with params
    if(params.toString() !== ''){
        url = `${API_URL}/catalogue?${params.toString()}`   
    }
    // console.log(url);
    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
    },)

    if (!res.ok) {
        throw new Error("Failed to load catalogue");
    }
    const data = await res.json();
    return data.books
}

//adding a new book in bookshop catalogue
export async function createBook(data: NewBookData, token: string) : Promise<void>{
    const res = await fetch(`${API_URL}/catalogue`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", //Saying to backend => the content is json
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(data),
    });

    if(!res.ok) {
        //if ther's an error..
        const errorData = await res.json().catch(() => null);//..res try to be parse in JSON: if failed it beacame null (rather than crash)
        throw new Error(errorData?.message || 'Failed to add book') //if no JSON, default message
    }
}

//updating a book in catalogue [NB: Partial<NewBookData> accepts partial changes]
export async function updateBook(id: number, data: Partial<NewBookData>, token: string) : Promise<void> {
    const res = await fetch(`${API_URL}/catalogue/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to update book");
    }
}

//delete a book from catalogue
export async function deleteBook(id: number, token: string): Promise<void> {
    const res = await fetch(`${API_URL}/catalogue/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }, //NB: no body becasue is deleting
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to delete book");
    }
}