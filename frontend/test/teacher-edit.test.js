import {Selector} from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`
    .page`http://localhost:4401/`

test('Testing edit teachers', async t => {
    // Wait for server to be ready
    let retries = 0;
    while (retries < 10) {
        try {
            await t.navigateTo("/");
            break;
        } catch (e) {
            retries++;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    if (retries === 10) throw new Error('Server failed to start');

    await t.click("#teacher-edit-10003");

    await t.typeText("#teacher-name", "Changed Teacher Name");
    await t.typeText("#teacher-age", "99");
    await t.click("#teacher-edit");

    await t.navigateTo("/");

    const table = Selector('#teacher-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).contains("Changed Teacher Name");

    await t.click("#teacher-delete-10003");
});
