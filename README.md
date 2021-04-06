### Install denon

If its your first run, please install `denon` from
[https://deno.land/x/denon](https://deno.land/x/denon) If there is error while
installing denon, refer this solution:
https://github.com/denosaurs/denon/issues/122#issuecomment-770895766

### Install Dependencies

To install dependencies, run following command in your terminal. **Note:
Terminal path must be project directory's root path**

```
deno cache --reload --unstable --lock-write --lock=lock.json ./deps.ts
```

**OR** run the `reload_deps.sh` file from the project directory

This will automatically download all the dependencies and update `lock.json`
file

### RUN

In your project root open terminal and run following command to run the project

```
denon start
```
