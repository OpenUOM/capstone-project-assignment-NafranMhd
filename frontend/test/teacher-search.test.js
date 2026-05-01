import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`

test('Testing search Teachers', async t => {
    let retries = 0;
    const maxRetries = 60;
    while (retries < maxRetries) {
        try {
            await t.navigateTo("http://localhost:4401/dbinitialize");
            break;
        } catch (e) {
            retries++;
            await t.wait(2000);
        }
    }
    if (retries === maxRetries) throw new Error('Server failed to start after 120s');

    await t.navigateTo("http://localhost:4401/");
    const searchInput = Selector('#teacher-search').with({ visibilityCheck: true });
    await t.expect(searchInput.exists).ok({ timeout: 30000 });

    await t.typeText("#teacher-search", "parasanna");

    const table = Selector('#teacher-table');
    await t.wait(1000); 

    const rowCount = await table.find('tr').count;
    let tdText = await table.find('tr').nth(rowCount - 1).innerText;

    await t.expect(rowCount).eql(2);
    await t.expect(tdText).contains("Parasanna");
});
