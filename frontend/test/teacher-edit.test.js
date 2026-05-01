import {Selector} from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`
    .page`http://localhost:4401/`
test('Testing edit teachers', async t => {
    await t.navigateTo("/dbinitialize");
    await t.navigateTo("/");
    await t.click("#teacher-edit-10003");

    await t.typeText("#teacher-name", "Changed Teacher Name", { replace: true });
    await t.typeText("#teacher-age", "99", { replace: true });
    await t.click("#teacher-edit");

    await t.navigateTo("/");

    const table = Selector('#teacher-table')
    let tdText = await table.find('tr').withText("10003").innerText;
    await t.expect(tdText).contains("Changed Teacher Name");

    await t.click("#teacher-delete-10003");
});
