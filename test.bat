@echo off

title Import
color 4E

for /D %%i in (*.*) do (
	cd %~dp0%%i
	npm install
	npm run build
)

echo "Builds finished"
cd %~dp0