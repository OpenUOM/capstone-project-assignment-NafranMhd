import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`

test('Testing delete teachers', async t => {
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

    await t.navigateTo("http://localhost:4401/addTeacher");
    const teacherIdInput = Selector('#teacher-id').with({ visibilityCheck: true });
    await t.expect(teacherIdInput.exists).ok({ timeout: 15000 });

    await t.typeText("#teacher-id", "300000");
    await t.typeText("#teacher-name", "Hasitha Fernando");
    await t.typeText("#teacher-age", "45");
    await t.click("#teacher-add");

    const table = Selector('#teacher-table').with({ visibilityCheck: true });
    await t.expect(table.exists).ok({ timeout: 15000 });

    let rowCount = await table.find('tr').count;
    await t.expect(rowCount).eql(4);

    await t.click("#teacher-delete-300000");
    await t.expect(Selector('#teacher-delete-300000').exists).notOk({ timeout: 15000 });
    
    rowCount = await table.find('tr').count;
    await t.expect(rowCount).eql(3);
});