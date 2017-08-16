import { Component } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Autocomplete Examples';
  form: FormGroup;

  constructor(private http: Http) {
    this.form = new FormBuilder().group({
      chips: [['chip'], []]
    });
  }

  disabled = true;
  items = ['Apple', 'Google', 'Facebook', 'Linkedin', 'Twitter'];
  inputText = 'text';
  itemsAsObjects = [{ id: 0, name: 'Angular4', readonly: true }, { id: 1, name: 'React Native' }, { id: 2, name: 'Tensor Flow Machine Learning' }];
  autocompleteItems = ['Sydney', 'New York', 'London', 'Paris', 'San Francisco', 'Tokyo', 'Makati', 'Mumbai' ,'Cebu', 'Iloilo', 'Davao', 'Taguig'];

  autocompleteItemsAsObjects = [
    { value: 'Philippines', id: 0, extra: 0 },
    { value: 'United States of America', id: 1, extra: 1 },
    { value: 'France', id: 2, extra: 2 },
    { value: 'Germany', id: 3, extra: 3 },
    { value: 'Ireland', id: 4, extra: 4 },
    { value: 'England', id: 5, extra: 5 },
    { value: 'Australia', id: 6, extra: 6 },
    { value: 'Bahrain', id: 7, extra: 7 },
    { value: 'Canada', id: 8, extra: 8 },
    { value: 'Denmark', id: 9, extra: 9 },
    { value: 'Finland', id: 10, extra: 10 },
    { value: 'Indonesia', id: 11, extra: 11 },
    'Singapore' // raw String is also accepted. 
  ];

  dragAndDropExample = ['JavaScript', 'Java', 'Android', 'Objective-C'];
  dragAndDropObjects = [{ display: 'Philippines', value: 'Philippines' }, { display: 'Australia', value: 'Australia' }];
  dragAndDropStrings = ['Manila', 'Cebu', 'Davao'];

  public requestAutocompleteItems = (text: string): Observable<Response> => {
    const url = `https://api.github.com/search/repositories?q=${text}`;
    return this.http
      .get(url)
      .map(data => data.json().items.map(item => item.full_name));
  };

  public requestAutocompleteItemsFake = (text: string): Observable<string[]> => {
    return Observable.of([
      'item1', 'item2', 'item3'
    ]);
  };

  public options = {
    readonly: undefined,
    placeholder: '+ Tag'
  };

  public onAdd(item) {
    console.log('tag added: value is ' + item);
  }

  public onRemove(item) {
    console.log('tag removed: value is ' + item);
  }

  public onSelect(item) {
    console.log('tag selected: value is ' + item);
  }

  public onFocus(item) {
    console.log('input focused: current value is ' + item);
  }

  public onTextChange(text) {
    console.log('text changed: value is ' + text);
  }

  public onBlur(item) {
    console.log('input blurred: current value is ' + item);
  }

  public onTagEdited(item) {
    console.log('tag edited: current value is ' + item);
  }

  public onValidationError(item) {
    console.log('invalid tag ' + item);
  }

  public transform(value: string): Observable<object> {
    const item = { display: `@${value}`, value: `@${value}` };
    return Observable.of(item);
  }

  private startsWithAt(control: FormControl) {
    if (control.value.charAt(0) !== '@') {
      return {
        'startsWithAt@': true
      };
    }

    return null;
  }

  private endsWith$(control: FormControl) {
    if (control.value.charAt(control.value.length - 1) !== '$') {
      return {
        'endsWith$': true
      };
    }

    return null;
  }

  private validateAsync(control: FormControl) {
    return new Promise(resolve => {
      const value = control.value;
      const result = isNaN(value) ? {
        isNan: true
      } : null;

      setTimeout(() => {
        resolve(result);
      }, 1);
    });
  }

  public asyncErrorMessages = {
    isNan: 'Please only add numbers'
  };

  public validators = [this.startsWithAt, this.endsWith$];

  public asyncValidators = [this.validateAsync];

  public errorMessages = {
    'startsWithAt@': 'Your items need to start with \'@\'',
    'endsWith$': 'Your items need to end with \'$\''
  };

  public onAdding(tag): Observable<any> {
    const confirm = window.confirm('Do you really want to add this tag?');
    return Observable
      .of(tag)
      .filter(() => confirm);
  }

  public onRemoving(tag): Observable<any> {
    const confirm = window.confirm('Do you really want to remove this tag?');
    return Observable
      .of(tag)
      .filter(() => confirm);
  }

  public asyncOnAdding(tag): Observable<any> {
    const confirm = window.confirm('Do you really want to add this tag?');
    return Observable
      .of(tag)
      .filter(() => confirm);
  }
}


