import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SquareComponent } from './square.component';
import { By } from '@angular/platform-browser';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test component inputs: id, content', () => {
    component.id = 35;
    fixture.detectChanges();

    let idElm: HTMLElement = fixture.debugElement.query(By.css('div div:nth-child(1)')).nativeElement;
    expect(idElm).toBeTruthy();
    expect(idElm.textContent).toContain(35);

    component.content = 'test content';
    fixture.detectChanges();

    let contentElm: HTMLElement = fixture.debugElement.query(By.css('div div:nth-child(2)')).nativeElement;
    expect(contentElm).toBeTruthy();
    expect(contentElm.textContent).toContain('test content');
  });

  it('test component output: onClickPost', () => {
    spyOn(component.onSelectPostEmitter, 'emit');
    component.onClickPost(35);
    expect(component.onSelectPostEmitter.emit).toHaveBeenCalledWith(35);
  });
});
