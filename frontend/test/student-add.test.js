import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`

test('Testing add students', async t => {
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

    await t.navigateTo("http://localhost:4401/addStudent");
    await t.typeText("#student-id", "999999");
    await t.typeText("#student-name", "Pasindu Basnayaka");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-hometown", "Catholic");
    await t.click("#student-add");

    const table = Selector('#student-table').with({ visibilityCheck: true });
    await t.expect(table.exists).ok({ timeout: 30000 });

    const lastRow = table.find('tr').last();
    await t.expect(lastRow.innerText).contains("Pasindu");
});
