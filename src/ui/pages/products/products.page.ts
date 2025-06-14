import { ProductDetailsModal } from "../modals/products/details.modals";
import { SalesPortalPage } from "../salesPortal.page";
import {FilterModal} from "../modals/customers/filter.modals";
import {DeleteModal} from "../modals/customers/delete.modals";
import {IProductInTable} from "../../../types/product.types";
import {MANUFACTURERS} from "../../../data/products/manufacturer.data";
import numeral from "numeral";
import {productsSortField} from "../../../types/api.types";

export class ProductsPage extends SalesPortalPage {
    //Modals
    readonly filterModal = new FilterModal(this.page);
    readonly deleteModal = new DeleteModal(this.page);
    readonly detailsModal = new ProductDetailsModal(this.page);

    readonly closeNotification= this.page.locator('.btn-close');

    //Header Menu
    readonly addNewProductButton = this.page.getByRole("button", {name: "Add Product",});

    readonly filterButton = this.page.getByRole("button", { name: "Filter" });
    readonly searchInput = this.page.locator('input[type="search"]');
    readonly searchButton = this.page.locator("#search-products");
    readonly chipButton = this.page.locator(".chip");
    readonly searchChipButton = this.page.locator('div[data-chip-products="search"]');

    //Table
    readonly table = this.page.locator("#table-products");

    //Table headers
    readonly tableHeader = this.page.locator("#table-products th div[current]");
    readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
    readonly priceHeader = this.tableHeader.filter({ hasText: "Price" });
    readonly manufacturerHeader = this.tableHeader.filter({ hasText: "Manufacturer" });
    readonly createdOnHeader = this.tableHeader.filter({ hasText: "Created On" });

    //table -row
    readonly tableRow = this.page.locator("#table-products tbody tr");
    readonly tableRowByName = (name: string) => this.tableRow.filter({ has: this.page.getByText(name) });
    readonly detailsButton = (name: string) => this.tableRowByName(name).getByTitle("Details");

    readonly uniqueElement = this.addNewProductButton;

    async clickDetails(name: string) {
        await this.detailsButton(name).click();
        await this.detailsModal.waitForOpened();
    }

    async clickAddNewProduct() {
        await this.addNewProductButton.click();
    }

    async getProductData(productName: string): Promise<IProductInTable> {
        const [name, price, manufacturer] = await this.tableRowByName(productName).locator("td").allInnerTexts(); //массив строк >> в const распаковывает этот массив в отдельные переменные
        return {
            name,
            price: numeral(price.trim()).value() ?? 0,
            manufacturer: manufacturer as MANUFACTURERS,
        };
    }

    async getTableData() {
        const tableData: Array<IProductInTable> = [];

        const rows = await this.tableRow.all();
        for (const row of rows) {
            const [name, price, manufacturer, createdOn] = await row.locator("td").allInnerTexts();
            tableData.push({
                name,
                price: numeral(price.trim()).value() ?? 0,
                manufacturer: manufacturer as MANUFACTURERS,
            });
        }
        return tableData;
    }

    async isProductFirstInTable(email: string): Promise<boolean> {
        const firstRow = this.tableRow.first();
        const firstRowEmail = await firstRow.locator('td').nth(0).textContent();
        return firstRowEmail?.trim() === email;
    }

    async fillSearch(value: string | number) {
        await this.searchInput.fill(String(value));
    }

    async clickSearch() {
        await this.searchButton.click();
    }

    async search(value: string | number) {
        await this.fillSearch(value);
        await this.clickSearch();
        await this.waitForOpened();
    }

    async clickTableHeader(header: productsSortField) {
        switch (header) {
            case "name":
                await this.nameHeader.click();
                break;
            case "price":
                await this.priceHeader.click();
                break;
            case "manufacturer":
                await this.manufacturerHeader.click();
                break;
            case "createdOn":
                await this.createdOnHeader.click();
                break;
        }
    }
}