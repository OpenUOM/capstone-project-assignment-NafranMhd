import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`
    .page`http://localhost:4401/`

test('Testing search Teachers', async t => {
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

    await t.navigateTo("http://localhost:4401/");
    
    const searchInput = Selector('#teacher-search').with({ visibilityCheck: true });
    await t.expect(searchInput.exists).ok({ timeout: 10000 });

    await t.typeText("#teacher-search", "parasanna");

    const table = Selector('#teacher-table');
    await t.wait(1000); // Wait for filter

    const rowCount = await table.find('tr').count;
    let tdText = await table.find('tr').nth(rowCount - 1).innerText;

    await t.expect(rowCount).eql(2);
    await t.expect(tdText).contains("Parasanna");
});