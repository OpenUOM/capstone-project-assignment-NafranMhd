import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`

test('Testing edit students', async t => {
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
    const studentIdInput = Selector('#student-id').with({ visibilityCheck: true });
    await t.expect(studentIdInput.exists).ok({ timeout: 30000 });

    await t.typeText("#student-id", "999999");
    await t.typeText("#student-name", "Pasindu Basnayaka");
    await t.typeText("#student-age", "45");
    await t.typeText("#student-hometown", "catholic");
    await t.click("#student-add");

    const table = Selector('#student-table').with({ visibilityCheck: true });
    await t.expect(table.exists).ok({ timeout: 30000 });

    await t.click("#student-edit-999999");

    const nameInput = Selector('#student-name').with({ visibilityCheck: true });
    await t.expect(nameInput.exists).ok({ timeout: 30000 });

    await t.typeText("#student-name", "Changed Student Name", { replace: true });
    await t.typeText("#student-age", "99", { replace: true });
    await t.typeText("#student-hometown", "Hometown", { replace: true });
    await t.click("#student-edit");

    await t.expect(table.exists).ok({ timeout: 30000 });
    const rowCount = await table.find('tr').count;
    let tdText = await table.find('tr').nth(rowCount - 1).innerText;

    await t.expect(tdText).contains("Changed Student Name");
});
