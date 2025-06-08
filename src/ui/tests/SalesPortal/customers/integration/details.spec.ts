import { apiConfig } from "config/api-config";
import { COUNTRIES } from "data/customers/countries.data";
import { expect, test } from "fixtures/businessSteps.fixture";
import { convertToDateAndTime } from "utils/date.utils";

test.describe("[UI] [Customers] [Details]", async () => {
    test("Should display valid customer data", async ({
                                                          loginAsLocalUser,
                                                          homePage,
                                                          customersPage,
                                                          customerDetailsPage,
                                                          mock,
                                                          page,
                                                      }) => {
        const expected = {
            email: "1742374793031Romaine.Keebler28@hotmail.com",
            name: "ArYdNbUxEbYkMhmgWBEpReOQmZgyXwkbtoy",
            country: "Great Britain" as COUNTRIES,
            city: "City pObKNUjAiTPtkDH",
            street: "Street u2oqBYeHT40t4PmZQcsCcjPicx5OJc8dh",
            house: 137,
            flat: 4568,
            phone: "+81463758682",
            createdOn: "2025-03-19T08:59:53.000Z",
            notes: "Notes afFPIXktpgJmYDrebRDqmJMCAfYveKuDpnmsNsjGVvjpQrrWsxZmkGXEbMPLoqNTGeTKwmOCWizzbgelFiXWusXqsUBSDjEsgllBIlePrgLZFBCFujkNpeUmuugrfXghQUcILcYTcfdzpOUcSTmFYANqyHBgDPXrmXqLYMOdItNfZWkrOztNsdDIuhsZFFXSAgyjbHYPKbdjuMuzsdfRxVvDVJiLfwMRUgAgxFoCzZjckRTpCcNl",
        };
        const id = "67da8789d006ba3d475eed7c";

        // await mock.customers({
        //   Customers: [
        //     {
        //       _id: id,
        //       ...expected,
        //     },
        //   ],
        //   ErrorMessage: null,
        //   IsSuccess: true,
        //   sorting: {
        //     sortField: "createdOn",
        //     sortOrder: "desc",
        //   },
        // });

        await mock.customerDetails({ Customer: { _id: id, ...expected }, ErrorMessage: null, IsSuccess: true });

        await loginAsLocalUser();
        // await homePage.clickModuleButton("Customers");
        // await customersPage.waitForOpened();

        // await customersPage.clickTableAction("aaa@gmail.com", "details");
        // await page.evaluate(async (id: string) => {
        //   await (
        //     window as typeof window & { renderCustomerDetailsPage: (id: string) => Promise<void> }
        //   ).renderCustomerDetailsPage(id);
        // }, id);
        await customerDetailsPage.open(id);
        await customerDetailsPage.waitForOpened();

        const actual = await customerDetailsPage.getDetails();
        expect(actual).toEqual({ ...expected, createdOn: convertToDateAndTime(expected.createdOn) });
    });
});