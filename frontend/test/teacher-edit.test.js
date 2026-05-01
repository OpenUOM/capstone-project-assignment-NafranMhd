import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`
    .page`http://localhost:4401/`

test('Testing edit teachers', async t => {
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

    // Ensure we are at the home page (teacher table)
    await t.navigateTo("http://localhost:4401/");
    const table = Selector('#teacher-table').with({ visibilityCheck: true });
    await t.expect(table.exists).ok({ timeout: 10000 });

    await t.click("#teacher-edit-10003");

    const nameInput = Selector('#teacher-name').with({ visibilityCheck: true });
    await t.expect(nameInput.exists).ok({ timeout: 10000 });

    await t.typeText("#teacher-name", "Changed Teacher Name", { replace: true });
    await t.typeText("#teacher-age", "99", { replace: true });
    await t.click("#teacher-edit");

    await t.expect(table.exists).ok({ timeout: 10000 });
    
    // Check the specific row for 10003
    const updatedRow = Selector('#teacher-edit-10003').parent('tr');
    await t.expect(updatedRow.innerText).contains("Changed Teacher Name");
});
