import Button from "@/components/UI/Button";

export default function AccountingPage() {
    return (
        <main className="p-6">
            <h1 className="font-heading text-2xl font-semibold text-carbon">Accounting</h1>
            <p className="mt-2 font-sans text-sm text-carbon/70">
                Coming soon: these features are planned for a future version.
            </p>

            <div className="mt-6 grid max-w-3xl grid-cols-2 gap-4">
                <section className="rounded border border-carbon/10 bg-alabaster p-4">
                    <h2 className="font-sans text-sm font-medium text-carbon/70">Total revenue</h2>
                    <p className="mt-2 font-heading text-2xl text-carbon">-</p>
                </section>

                <section className="rounded border border-carbon/10 bg-alabaster p-4">
                    <h2 className="font-sans text-sm font-medium text-carbon/70">Completed orders</h2>
                    <p className="mt-2 font-heading text-2xl text-carbon">-</p>
                </section>

                {/* col-span-2: the chart takes the full width of the grid */}
                <section className="col-span-2 rounded border border-carbon/10 bg-alabaster p-4">
                    <h2 className="font-sans text-sm font-medium text-carbon/70">Monthly trend</h2>
                    <div className="mt-3 flex h-32 items-center justify-center rounded bg-carbon/5">
                        <p className="font-sans text-sm text-carbon/70">Chart not available yet</p>
                    </div>
                </section>
            </div>

            <div className="mt-6">
                <Button variant="secondary" disabled>Export report</Button>
            </div>
        </main>
    );
}