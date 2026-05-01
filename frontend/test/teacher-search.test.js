import {Selector} from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`
    .page`http://localhost:4401/`

test('Testing search Teachers', async t => {
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

    await t.navigateTo("/");
    await t.typeText("#teacher-search", "parasanna");

    const table = Selector('#teacher-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount-1).innerText;
    await t.expect(rowCount).eql(2);
    await t.expect(tdText).contains("Parasanna");
});