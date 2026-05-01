import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`

test('Testing add teachers', async t => {
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

    await t.navigateTo("http://localhost:4401/addTeacher");
    await t.typeText("#teacher-id", "123456");
    await t.typeText("#teacher-name", "Mohan Perera");
    await t.typeText("#teacher-age", "45");
    await t.click("#teacher-add");

    const table = Selector('#teacher-table').with({ visibilityCheck: true });
    await t.expect(table.innerText).contains("Mohan", { timeout: 30000 });
});
