import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { of, throwError } from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  const mockUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

  beforeEach(async () => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['getAllUsers']);

    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init and assign to users array', () => {
    usersServiceSpy.getAllUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(usersServiceSpy.getAllUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should log error if getAllUsers fails', () => {
    const consoleSpy = spyOn(console, 'error');
    const errorMsg = 'Error occurred';
    usersServiceSpy.getAllUsers.and.returnValue(throwError(() => new Error(errorMsg)));

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching users:', jasmine.any(Error));
    expect(component.users).toEqual([]);
  });
});
