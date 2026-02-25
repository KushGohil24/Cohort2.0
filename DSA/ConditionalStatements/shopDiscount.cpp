/*
amount   discount
0-5k        0%
5001-7k     5%
7001-9k     10%
>9k         20%
*/
#include <iostream>
using namespace std;
int main()
{
    int amount, payableAmount;
    double disc = 0;
    cout << "Enter amount: ";
    cin >> amount;
    if (amount >= 0 && amount <= 5000)
    {
        disc = 0;
    }
    else if (amount > 5000 && amount <= 7000)
    {
        disc = 0.05;
    }
    else if (amount > 7000 && amount <= 9000)
    {
        disc = 0.1;
    }
    else if (amount > 9000)
    {
        disc = 0.2;
    }
    else
    {
        disc = -1;
    }

    if (disc != -1)
    {
        payableAmount = amount - (amount * disc);
        cout << "Payable amount is : " << payableAmount << endl;
    }
    else
    {
        cout << "Invalid amount." << endl;
    }
    return 0;
}