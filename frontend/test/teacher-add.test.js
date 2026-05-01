import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`

test('Testing add teachers', async t => {
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
    const teacherIdInput = Selector('#teacher-id').with({ visibilityCheck: true });
    await t.expect(teacherIdInput.exists).ok({ timeout: 30000 });

    await t.typeText("#teacher-id", "123456");
    await t.typeText("#teacher-name", "Mohan Perera");
    await t.typeText("#teacher-age", "45");
    await t.click("#teacher-add");

    const table = Selector('#teacher-table').with({ visibilityCheck: true });
    await t.expect(table.exists).ok({ timeout: 30000 });

    const rowCount = await table.find('tr').count;
    let tdText = await table.find('tr').nth(rowCount - 1).innerText;

    await t.expect(rowCount).eql(4);
    await t.expect(tdText).contains("Mohan");
});
