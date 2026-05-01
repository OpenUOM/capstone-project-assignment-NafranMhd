import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`
    .page`http://localhost:4401/`

test('Testing search students', async t => {
    let retries = 0;
    const maxRetries = 20;
    while (retries < maxRetries) {
        try {
            await t.navigateTo("http://localhost:4401/dbinitialize");
            const body = await Selector('pre').innerText;
            if (body.includes('Database initialized')) break;
        } catch (e) {
            retries++;
            await t.wait(2000);
        }
    }
    if (retries === maxRetries) throw new Error('Server failed to start');

    const navbar = Selector('app-navbar').with({ visibilityCheck: true });
    await t.expect(navbar.exists).ok({ timeout: 15000 });

    await t.navigateTo("http://localhost:4401/student");
    
    const searchInput = Selector('#student-search').with({ visibilityCheck: true });
    await t.expect(searchInput.exists).ok({ timeout: 10000 });

    await t.typeText("#student-search", "is");

    const table = Selector('#student-table');
    // Wait for filter to apply
    await t.wait(1000);

    const rowCount = await table.find('tr').count;
    let tdText = await table.find('tr').nth(rowCount-1).innerText;

    await t.expect(rowCount).eql(2);
    await t.expect(tdText).contains("Isuri");
});