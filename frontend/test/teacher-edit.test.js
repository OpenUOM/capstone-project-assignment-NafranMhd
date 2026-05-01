import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`

test('Testing edit teachers', async t => {
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
    await t.click("#teacher-edit-10003");
    await t.typeText("#teacher-name", "Changed Teacher Name", { replace: true });
    await t.click("#teacher-edit");

    const table = Selector('#teacher-table').with({ visibilityCheck: true });
    await t.expect(table.innerText).contains("Changed Teacher Name", { timeout: 30000 });
});
