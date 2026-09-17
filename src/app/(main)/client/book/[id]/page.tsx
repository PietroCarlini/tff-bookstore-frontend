import { getBookDetailsAction } from '@/actions/bookAction';
import BookActions from '@/components/book/bookAction';
import Image from "next/image";

export default async function BookDetailsPage(
    { params }: {
        params: Promise<{ id: string }>;
    }) {
    const { id } = await params;
    const book = await getBookDetailsAction(id)
    return (
        <main className='p-6'>
            <div>
                {book.cover ? (
                    <Image
                        src={book.cover}
                        alt={book.title}
                        width={128}
                        height={192}
                        className="rounded"
                    />
                ) : (
                    <div className="h-48 w-32 rounded bg-carbon/10" />
                )}
                <p className="font-sans text-sm font-medium text-carbon">
                    {book.title}
                </p>
                <p className="font-sans text-xs text-carbon/70">
                    {book.authors.join(", ")}
                </p>
                <p className="font-sans text-sm font-medium text-carbon">
                    {book.isbn}
                </p>
                <p className="font-sans text-sm font-medium text-carbon">
                    {book.publisher}
                </p>
                <p className="font-sans text-sm font-medium text-carbon">
                    {book.pubDate}
                </p>
                <p className="font-sans text-sm font-medium text-carbon">
                    {book.description}
                </p>
                <BookActions isbn={book.isbn} title={book.title} author={book.authors.join(", ")} cover={book.cover} />
            </div >
        </main>
    )
}