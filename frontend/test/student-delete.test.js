import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`

test('Testing delete students', async t => {
    let retries = 0;
    const maxRetries = 30;
    while (retries < maxRetries) {
        try {
            await t.navigateTo("http://localhost:4401/dbinitialize");
            break;
        } catch (e) {
            retries++;
            await t.wait(2000);
        }
    }
    if (retries === maxRetries) throw new Error('Server failed to start');

    await t.navigateTo("http://localhost:4401/addStudent");
    const studentIdInput = Selector('#student-id').with({ visibilityCheck: true });
    await t.expect(studentIdInput.exists).ok({ timeout: 15000 });

    await t.typeText("#student-id", "222222");
    await t.typeText("#student-name", "Hiruni Gajanayake");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-hometown", "buddhist");
    await t.click("#student-add");

    const table = Selector('#student-table').with({ visibilityCheck: true });
    await t.expect(table.exists).ok({ timeout: 15000 });

    let rowCount = await table.find('tr').count;
    await t.expect(rowCount).eql(4);

    await t.click("#student-delete-222222");
    
    await t.expect(Selector('#student-delete-222222').exists).notOk({ timeout: 15000 });
    
    rowCount = await table.find('tr').count;
    await t.expect(rowCount).eql(3);
});
