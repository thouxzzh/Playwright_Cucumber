import { getEnv } from '../helper/env/env';
import { Before,After,BeforeAll,AfterAll,Status } from "@cucumber/cucumber";
import { chromium,Browser,Page,BrowserContext } from "@playwright/test";
import { pageFixture } from "./pagefixture";
import { invokeBrowser } from "../helper/browsers/browserManager";

let browser:Browser;
let context: BrowserContext;

BeforeAll(async function() {
    //  browser=await chromium.launch({headless:false});
    getEnv();
    browser = await invokeBrowser();

});

Before(async function() {
    context=await browser.newContext();
    const page = await context.newPage();
    pageFixture.page=page;
    
});

After(async function({pickle,result}) {
    console.log(result?.status);
    if(result?.status==Status.FAILED) {
        const img=await pageFixture.page.screenshot({path: `./test-result/screenshots/${pickle.name}.png`,type: "png"})
        await this.attach(img,"image/png");
    }
    await pageFixture.page.close();
    await context.close();
    
});

AfterAll(async function(){
    await browser.close();
});




