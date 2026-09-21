import { redirect } from "next/navigation";

// the bookshop has no home page: it starts from the catalogue
export default function BookshopHomePage() {
    redirect("/bookshop/catalogue");
}