# Upgrading from v2 to v4

1. Update the package `chayns-components` to its latest version
    ```bash
    npm install chayns-components@latest -S
    ```

2. Use the new chayns® API v4 instead of v3.1
    ```html
    <!-- CSS-API -->
    <!--<link rel="stylesheet" href="//chayns-res.tobit.com/API/V3.1/css/chayns.min.css">-->
    <link rel="stylesheet" href="https://api.chayns.net/css/">
    
    <!-- JS-API -->
    <!--<script src="https://chayns-res.tobit.com/API/V3.1/js/chayns.min.js"></script>-->
    <script src="https://api.chayns-static.space/js/v4.0/chayns.min.js"></script>
    
    <!-- chaynsLangRes -->
    <!--<script src="//chayns-res.tobit.com/API/v3/intern/chaynsLangRes/js/chaynsLangRes.js"></script>-->
    <script src="https://api.chayns-static.space/lang/v4.0/js/chaynsLangRes.min.js"></script>
    <script src="https://api.chayns-static.space/translate/v4.0/js/chaynsTranslate.min.js"></script>
    
    <!-- chaynsTime -->
    <!--<script src="https://chayns-res.tobit.com/API/v3/intern/chaynsTime/js/chaynsTime.min.js"></script>-->
    <!--Use date-fns or the DateInfo component instead-->
    ```

3. Replace your icons with the new Icon-Component
    ```jsx
    <!--<i class="fa fa-rocket" aria-hidden="true"></i>-->
    <!--<i class="ts-tobit" aria-hidden="true"></i>-->
    
    <Icon icon={fa fa-rocket}/>
    <Icon icon="ts-tobit"/>
    ```

4. Replace color classes

    API v3 classes:
    - .chayns__background-color--[0;100]
    - .chayns__color--[0;100]
    - .chayns__border-color--[0;100]
    
    API v4 classes:
    - .chayns__background-color--[000-009, 100-109, 200-209, 300-309, primary, headline, text]
    - .chayns__color--[000-009, 100-109, 200-209, 300-309, primary, headline, text]
    - .chayns__border-color--[000-009, 100-109, 200-209, 300-309, primary, headline, text]
    
    - .chayns__background-color--green-[0;4]
    - .chayns__color--green-[0;4]
    - .chayns__border-color--green-[0;4]
    
    - .chayns__background-color--red-[0;4]
    - .chayns__color--red-[0;4]
    - .chayns__border-color--red-[0;4]
    
    - .chayns__background-color--yellow-[0;4]
    - .chayns__color--yellow-[0;4]
    - .chayns__border-color--yellow-[0;4]
    
    For more informations, check [this](https://design.chayns.net/Farben) out.

5. Check all styles

6. Change [Modeswitch](/src/react-chayns-modeswitch/) to component

    ```jsx
    <ModeSwitch 
        modes={[{
            id: 1,
            uacIds: [1],
            name: 'chayns-Manager'
        }]}
        save
        onChange={console.log}
    />
    ```

7. Change the Upload-component to the new [FileInput](https://github.com/TobitSoftware/chayns-components/tree/master/src/react-chayns-file_input).
   
8. A lot of the other components have changed since version 2. Check the [Component Docs](https://github.com/TobitSoftware/chayns-components/blob/master/README.md) for further information.
