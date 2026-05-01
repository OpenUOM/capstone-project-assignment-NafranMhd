import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`

test('Testing delete students', async t => {
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
    await t.typeText("#student-id", "222222");
    await t.typeText("#student-name", "Hiruni Gajanayake");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-hometown", "Buddhist");
    await t.click("#student-add");

    await t.click("#student-delete-222222");
    await t.expect(Selector('#student-delete-222222').exists).notOk({ timeout: 30000 });
});
