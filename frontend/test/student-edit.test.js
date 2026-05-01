import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`

test('Testing edit students', async t => {
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

    await t.click("#student-edit-999999");
    await t.typeText("#student-name", "Changed Student Name", { replace: true });
    await t.click("#student-edit");

    const table = Selector('#student-table').with({ visibilityCheck: true });
    await t.expect(table.innerText).contains("Changed Student Name", { timeout: 30000 });
});
