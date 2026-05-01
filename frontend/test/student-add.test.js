import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`
    // Do not use .page here to avoid early failure before server is ready

test('Testing add students', async t => {
    // Robust wait for server to be ready
    let retries = 0;
    const maxRetries = 30; // 60 seconds total wait
    while (retries < maxRetries) {
        try {
            await t.navigateTo("http://localhost:4401/dbinitialize");
            break;
        } catch (e) {
            retries++;
            await t.wait(2000);
        }
    }
    if (retries === maxRetries) throw new Error('Server failed to start at localhost:4401');

    await t.navigateTo("http://localhost:4401/addStudent");
    const studentIdInput = Selector('#student-id').with({ visibilityCheck: true });
    await t.expect(studentIdInput.exists).ok({ timeout: 15000 });

    await t.typeText("#student-id", "999999");
    await t.typeText("#student-name", "Pasindu Basnayaka");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-hometown", "Catholic");
    await t.click("#student-add");

    const table = Selector('#student-table').with({ visibilityCheck: true });
    await t.expect(table.exists).ok({ timeout: 15000 });

    const rowCount = await table.find('tr').count;
    let tdText = await table.find('tr').nth(rowCount - 1).innerText;

    await t.expect(rowCount).eql(4);
    await t.expect(tdText).contains("Pasindu");
});
