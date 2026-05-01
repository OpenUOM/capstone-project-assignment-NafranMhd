import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`
    .page`http://localhost:4401/`

test('Testing delete students', async t => {
    let retries = 0;
    const maxRetries = 20;
    while (retries < maxRetries) {
        try {
            await t.navigateTo("http://localhost:4401/dbinitialize");
            const body = await Selector('pre').innerText;
            if (body.includes('Database initialized')) break;
        } catch (e) {
            retries++;
            await t.wait(2000);
        }
    }
    if (retries === maxRetries) throw new Error('Server failed to start');

    const navbar = Selector('app-navbar').with({ visibilityCheck: true });
    await t.expect(navbar.exists).ok({ timeout: 15000 });

    await t.navigateTo("http://localhost:4401/addStudent");
    const studentIdInput = Selector('#student-id').with({ visibilityCheck: true });
    await t.expect(studentIdInput.exists).ok({ timeout: 10000 });

    await t.typeText("#student-id", "222222");
    await t.typeText("#student-name", "Hiruni Gajanayake");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-hometown", "buddhist");
    await t.click("#student-add");

    const table = Selector('#student-table').with({ visibilityCheck: true });
    await t.expect(table.exists).ok({ timeout: 10000 });

    let rowCount = await table.find('tr').count;
    await t.expect(rowCount).eql(4);

    await t.click("#student-delete-222222");
    
    // Wait for the row to disappear
    await t.expect(Selector('#student-delete-222222').exists).notOk({ timeout: 10000 });
    
    rowCount = await table.find('tr').count;
    await t.expect(rowCount).eql(3);
});
