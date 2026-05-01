import {Selector} from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`
    .page`http://localhost:4401/`

test('Testing delete teachers', async t => {
    // Wait for server to be ready and reset DB
    let retries = 0;
    while (retries < 10) {
        try {
            await t.navigateTo("/dbinitialize");
            break;
        } catch (e) {
            retries++;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    if (retries === 10) throw new Error('Server failed to start');

    await t.navigateTo("/addTeacher");
    await t.typeText("#teacher-id", "300000");
    await t.typeText("#teacher-name", "Hasitha Fernando");
    await t.typeText("#teacher-age", "45");
    await t.click("#teacher-add");

    await t.navigateTo("/");

    await t.click("#teacher-delete-300000");

    const table = Selector('#teacher-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).notContains("Hasitha Fernando");
});