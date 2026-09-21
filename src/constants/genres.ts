export interface Genre {
    slug: string;  // used in the URL: /client?genre=fantasy
    name: string;  // the title shown to the user
    query: string; // what we send to Google Books
}

export const genres: Genre[] = [
    { slug: "mystery", name: "Mystery & Crime", query: "subject:mystery" },
    { slug: "adventure", name: "Adventure", query: "subject:adventure" },
    { slug: "fantasy", name: "Fantasy", query: "subject:fantasy" },
    { slug: "science-fiction", name: "Science fiction", query: 'subject:"science fiction"' },
];

// undefined if the slug is not one of ours (e.g. someone types a wrong URL)
export function getGenre(slug: string): Genre | undefined {
    return genres.find((genre) => genre.slug === slug);
}