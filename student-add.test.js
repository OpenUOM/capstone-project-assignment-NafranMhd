import { Selector, ClientFunction } from 'testcafe';
process.env.NODE_ENV = "test";

const getPageUrl = ClientFunction(() => window.location.href);

fixture`Testing Student UI`
    .page`http://localhost:4401/student`

test('Testing add students', async t => {
    // Wait for server to be ready
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

    await t.navigateTo("/addStudent");
    await t.typeText("#student-id", "999999");
    await t.typeText("#student-name", "Pasindu Basnayaka");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-Hometown", "Catholic");
    await t.click("#student-add");

    await t.navigateTo("/student");

    const table = Selector('#student-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    await t.expect(tdText).contains("Pasindu Basnayaka");
});
