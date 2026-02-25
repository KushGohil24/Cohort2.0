#include<iostream>
using namespace std;
int main(){
    int num;
    cout<<"Enter a number: ";
    cin>>num;
    if(num%2 == 0){
        cout<<"given number " <<num<< " is even."<<endl;
    }else{
        cout<<"given number "<<num<<" is odd."<<endl;
    }
    return 0;
}