import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`

test('Testing delete teachers', async t => {
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
    await t.typeText("#teacher-id", "300000");
    await t.typeText("#teacher-name", "Hasitha Fernando");
    await t.typeText("#teacher-age", "45");
    await t.click("#teacher-add");

    await t.click("#teacher-delete-300000");
    await t.expect(Selector('#teacher-delete-300000').exists).notOk({ timeout: 30000 });
});
